<template>
  <v-container>
    <v-card subtitle="Detalle del grupo">
      <v-card-item class="border-t">
        <v-row>
          <v-col>
            <v-list-item>
              <v-list-item-title>Plan</v-list-item-title>
              <v-list-item-subtitle>
                {{ group?.curriculum }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Curso</v-list-item-title>
              <v-list-item-subtitle>{{ group?.course }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Modulo</v-list-item-title>
              <v-list-item-subtitle>{{ group?.module }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Área</v-list-item-title>
              <v-list-item-subtitle>{{ group?.area }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col>
            <v-list-item>
              <v-list-item-title>Grupo</v-list-item-title>
              <v-list-item-subtitle>{{ group?.name }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Periodo</v-list-item-title>
              <v-list-item-subtitle
                >{{ group?.period }} - {{ group?.month }}</v-list-item-subtitle
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Modalidad</v-list-item-title>
              <v-list-item-subtitle>{{ group?.modality }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Horario</v-list-item-title>
              <v-list-item-subtitle>
                {{ group?.schedules?.days }} {{ group?.schedules?.startHour }} -
                {{ group?.schedules?.endHour }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-item>
      <v-tabs v-model="tab">
        <v-tab value="list"> Estudiantes </v-tab>
        <v-tab value="grade"> Notas </v-tab>
        <v-tab value="attendance"> Asistencia </v-tab>
      </v-tabs>
    </v-card>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="list">
        <v-card class="rounded-0">
          <v-row>
            <v-col cols="12">
              <v-table class="roudend-0" hover>
                <thead class="roudend-0 bg-grey-lighten-3">
                  <tr>
                    <th>N°</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Celular</th>
                    <th>Tipo de estudiante</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(student, index) in groupStudents"
                    :key="student.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ student.documentNumber }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.lastNameFather }}</td>
                    <td>{{ student.lastNameMother }}</td>
                    <td>{{ student.phone }}</td>
                    <td>{{ student.studentType }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </v-card>
      </v-tabs-window-item>
      <v-tabs-window-item value="grade">
        <v-card class="rounded-0">
          <v-row>
            <v-col cols="12">
              <v-table class="roudend-0" hover>
                <thead class="bg-grey-lighten-3">
                  <tr>
                    <th>N°</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th
                      style="width: 120px"
                      v-for="index in group.units"
                      :key="index"
                    >
                      <span v-if="group.gradingModel == 1">
                        <template v-if="index == 1"> Prom. Cap. </template>
                        <template v-else> Act </template>
                      </span>
                      <span v-else> Unidad {{ index }} </span>
                    </th>
                    <th style="width: 120px">Nota final</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(student, index) in gradeStudents"
                    :key="student.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ student.documentNumber }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.lastNameFather }}</td>
                    <td>{{ student.lastNameMother }}</td>
                    <td
                      v-for="(grade, i) in student.gradeUnits"
                      :key="i"
                      class="border-s"
                    >
                      <v-select
                        v-if="group.gradingModel == 1 && grade.order == 2"
                        v-model.number="grade.grade"
                        density="compact"
                        :readonly="
                          periodStore.gradeDeadline?.periodId != group.periodId
                        "
                        :items="[
                          { title: 'A', value: 2 },
                          { title: 'B', value: 1 },
                          { title: 'C', value: 0 },
                        ]"
                        @update:model-value="updateFinalGrade(index)"
                      />

                      <v-number-input
                        v-else
                        :readonly="
                          periodStore.gradeDeadline?.periodId != group.periodId
                        "
                        v-model.number="grade.grade"
                        controlVariant="hidden"
                        :precision="2"
                        :max="20"
                        :min="0"
                        density="compact"
                        @update:model-value="updateFinalGrade(index)"
                      ></v-number-input>
                    </td>
                    <td class="border-s">
                      <v-number-input
                        v-model.number="student.finalGrade"
                        :precision="2"
                        density="compact"
                        controlVariant="hidden"
                        readonly
                      ></v-number-input>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
          <v-card-actions class="bg-grey-lighten-3">
            <v-btn
              v-if="group.hasAcademicRecord"
              color="primary"
              @click="lastAcademicRecordPdf()"
              variant="tonal"
              :loading="loadingGeneratePdf"
            >
              <template #prepend>
                <LnxIcon iconName="document-download" />
              </template>
              Visualizar acta
            </v-btn>

            <v-btn
              v-if="periodStore.gradeDeadline?.periodId == group.periodId"
              color="dark"
              variant="tonal"
              :loading="loadingGeneratePdf"
            >
              <template #prepend>
                <LnxIcon iconName="document-download" />
              </template>
              <DialogConfirm
                :title="'Confirmar'"
                :message="'<b>Asegúrate de que toda la información sea correcta antes de continuar</b>.<br>Al generar el acta de notas, el grupo se dará por <b>FINALIZADO</b>.'"
                :loading="loadingGeneratePdf"
                :confirmText="'Generar'"
                :cancelText="'Cancelar'"
                @onConfirm="saveAcademicRecordPdf"
              >
                <v-card-item class="border-b" v-if="group.hasAcademicRecord">
                  <v-textarea
                    v-model="observations"
                    label="Observaciones"
                    rows="2"
                    outlined
                    density="compact"
                  />
                </v-card-item>
              </DialogConfirm>

              Generar acta
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="periodStore.gradeDeadline?.periodId == group.periodId"
              v-tooltip:top="'Guardar cambios'"
              color="primary"
              variant="flat"
              @click="saveGrades"
              class="ms-2"
              :loading="loadingSave"
            >
              <template #prepend>
                <LnxIcon iconName="task" />
              </template>
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tabs-window-item>
      <v-tabs-window-item value="attendance">
        <v-card class="rounded-0">
          <v-row>
            <v-col cols="12">
              <v-table class="roudend-0" hover>
                <thead class="roudend-0 bg-grey-lighten-3">
                  <tr>
                    <th>N°</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th style="width: 200px">
                      <v-text-field
                        v-model="dateAttendance"
                        density="compact"
                        type="date"
                        @update:model-value="getAttendanceStudents"
                      ></v-text-field>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(student, index) in attendanceStudents"
                    :key="student.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ student.documentNumber }}</td>
                    <td>
                      {{ student.lastNameFather }} {{ student.lastNameMother }},
                      {{ student.name }}
                    </td>
                    <td>
                      <v-select
                        v-model="student.status"
                        density="compact"
                        :items="['PRESENTE', 'FALTA', 'TARDE']"
                      >
                      </v-select>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>

          <v-card-actions class="bg-grey-lighten-3">
            <v-btn
              v-if="!true"
              color="primary"
              variant="tonal"
              :loading="loadingGeneratePdf"
            >
              <template #prepend>
                <LnxIcon iconName="document-download" />
              </template>
              Resumen asistencia
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn
              v-if="periodStore.gradeDeadline?.periodId == group.periodId"
              v-tooltip:top="'Guardar asistencia'"
              color="primary"
              variant="flat"
              @click="saveAttendance"
              class="ms-2"
              :loading="loadingSave"
            >
              <template #prepend>
                <LnxIcon iconName="task" />
              </template>
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  _getGroup,
  _groupStudents,
  _getGradeStudents,
  _getAttendanceStudents,
  _saveGradeStudents,
  _saveAttendanceStudents,
  _saveAcademicRecordPdf,
  _lastAcademicRecordPdf,
} from "@/app/modules/Group/services/";

import { useHeadingStore } from "@/app/store/heading.store";
import { usePeriodStore } from "@/app/store/period.stores";
import DialogConfirm from "@/core/ui/components/Dialog/DialogConfirm.vue";


const headingStore = useHeadingStore();
const periodStore = usePeriodStore();

const route = useRoute();
const loadingView = ref<boolean>(false);
const loadingGeneratePdf = ref<boolean>(false);

const tab = ref<any>("list");

const group = ref<any>(null);
const groupStudents = ref<any[]>([]);

const dateAttendance = ref<string>(new Date().toISOString().split("T")[0]);

interface GradeUnits {
  id: number;
  order: number;
  grade: number;
}

interface GradeStudent {
  id: number;
  name: string;
  lastNameFather: string;
  lastNameMother: string;
  documentNumber: string;
  studentId: number;
  enrollmentGroupId: number;
  capacityAverage: number;
  gradeId: number;
  gradeUnits: GradeUnits[];
  finalGrade: number;
}
const gradeStudents = ref<GradeStudent[]>([]);

const attendanceStudents = ref<any[]>([]);

const loadingSave = ref<boolean>(false);
const observations = ref<string>("");

const updateFinalGrade = (index: number) => {
  let student = gradeStudents.value[index];

  if (group.value.gradingModel == 1) {
    let capacityGrades = student.gradeUnits.filter((g: any) => g.order !== 2); // Excluir actitud
    let totalCapacity = capacityGrades.reduce(
      (sum: number, g: any) => sum + (parseFloat(g.grade) || 0),
      0
    );

    let capacityAverage =
      capacityGrades.length > 0 ? totalCapacity / capacityGrades.length : 0;

    let attitudeUnit = student.gradeUnits.find((g: any) => g.order === 2);
    let attitude = attitudeUnit ? attitudeUnit.grade || 0 : 0;
    student.finalGrade = Number(capacityAverage * 0.9 + attitude);
  } else if (group.value.gradingModel == 2) {
    let totalGrades = student.gradeUnits.reduce(
      (sum: number, g: any) => sum + (Number(g.grade) || 0),
      0
    );
    let unitCount = student.gradeUnits.length;

    student.finalGrade = unitCount > 0 ? Number(totalGrades / unitCount) : 0;
  }
};

const mapRequestGrade = () => {
  console.log(gradeStudents.value);
  return gradeStudents.value.map((student) => {
    return {
      enrollmentGroupId: student.id,
      studentId: student.studentId,
      gradeId: student.gradeId,
      finalGrade: student.finalGrade,
      gradeUnits: student.gradeUnits.map((unit) => {
        return {
          id: unit.id,
          grade: unit.grade,
          order: unit.order,
        };
      }),
    };
  });
};

const saveAttendance = async () => {
  loadingSave.value = true;
  const students = attendanceStudents.value.map((student) => {
    return {
      enrollmentGroupId: student.enrollmentGroupId,
      studentId: student.id,
      status: student.status,
      date: dateAttendance.value,
    };
  });
  attendanceStudents.value = await _saveAttendanceStudents({
    students: students,
  });
  loadingSave.value = false;
};

const saveAcademicRecordPdf = async () => {
  loadingGeneratePdf.value = true;
  await _saveAcademicRecordPdf({
    id: group.value.id,
    observations: observations.value,
  });
  loadingGeneratePdf.value = false;
};

const lastAcademicRecordPdf = async () => {
  loadingGeneratePdf.value = true;
  const res = await _lastAcademicRecordPdf(group.value.id);
  loadingGeneratePdf.value = false;
  return res;
};

const saveGrades = async () => {
  const id = route.params.id;
  loadingSave.value = true;
  const grades = mapRequestGrade();
  await _saveGradeStudents({ grades: grades });
  gradeStudents.value = (await _getGradeStudents(id)) as GradeStudent[];
  loadingSave.value = false;
};

const getAttendanceStudents = async () => {
  const id = route.params.id;
  loadingView.value = true;
  attendanceStudents.value = await _getAttendanceStudents({
    id: id,
    date: dateAttendance.value,
  });
  console.log(attendanceStudents);
  loadingView.value = false;
};

const initView = async () => {
  loadingView.value = true;
  const id = route.params.id;
  group.value = await _getGroup(id);
  groupStudents.value = await _groupStudents(id);
  gradeStudents.value = (await _getGradeStudents(id)) as GradeStudent[];
  await getAttendanceStudents();
  loadingView.value = false;
  headingStore.setHeading(
    `${group?.value.name} | ${group?.value.course}`,
    `Gestión del grupo`
  );
};

onMounted(() => {
  initView();
});
</script>
