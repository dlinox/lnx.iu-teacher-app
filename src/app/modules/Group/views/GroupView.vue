<template>
  <v-card
    :title="`${group?.name} | ${group?.course}`"
    subtitle="Estudiantes matriculados"
    class="rounded-0"
  >
    <template v-slot:append>
      <v-btn variant="text" @click="$router.go(-1)">
        <template v-slot:prepend>
          <LnxIcon iconName="arrow-left-3" size="large" />
        </template>
        Atrás
      </v-btn>
    </template>
  </v-card>
  <v-container>
    <v-card class="border" rounded="0">
      <v-tabs v-model="tab">
        <v-tab value="list"> Lista de estudiantes </v-tab>
        <v-tab value="grade"> Notas </v-tab>
      </v-tabs>
      <v-card-item>
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
                <v-chip
                  v-for="schedule in group?.schedules"
                  :key="schedule.id"
                  color="primary"
                  rounded="0"
                  class="me-2"
                  label
                >
                  {{ schedule.day }} {{ schedule.start_hour }} -
                  {{ schedule.end_hour }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="list">
        <v-card class="rounded-0">
          <v-row>
            <v-col cols="12">
              <v-table class="roudend-0">
                <thead class="roudend-0 bg-grey">
                  <tr>
                    <th>N°</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Email</th>
                    <th>Teléfono</th>
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
                    <td>{{ student.email }}</td>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="flat" v-if="false">
              Registrar notas
              <LnxDialogConfirm
                title="Guardar notas"
                message="¿Seguro que desea guardar las notas?,verifique que los datos sean correctos."
                @onConfirm="saveGrades()"
              />
            </v-btn>
          </v-card-actions>
          <v-row>
            <v-col cols="12">
              <v-table class="roudend-0">
                <thead class="roudend-0 bg-grey">
                  <tr>
                    <th>N°</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th
                      style="width: 150px"
                      v-for="index in group.units"
                      :key="index"
                    >
                      UNIDAD: {{ index }}
                    </th>
                    <th style="width: 150px">Nota final</th>
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
                        v-if="group.curriculumId == 1 && grade.order == 2"
                        v-model="grade.grade"
                        density="compact"
                        :items="[
                          { title: 'A', value: '2.00' },
                          { title: 'B', value: '1.00' },
                          { title: 'C', value: '0.00' },
                        ]"
                        @update:model-value="updateFinalGrade(index)"
                      />
                      <v-text-field
                        v-else
                        v-model.number="grade.grade"
                        type="number"
                        min="0"
                        max="20"
                        density="compact"
                        @update:model-value="updateFinalGrade(index)"
                      />
                    </td>
                    <td class="border-s">
                      <v-text-field
                        type="number"
                        v-model.number="student.finalGrade"
                        density="compact"
                        readonly
                      />
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
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
  _saveGradeStudents,
} from "@/app/modules/Group/services/";

const route = useRoute();
const loadingView = ref<boolean>(false);

const tab = ref<any>("list");

const group = ref<any>(null);
const groupStudents = ref<any[]>([]);
interface GradeUnits {
  id: number;
  order: number;
  grade: number;
}
interface GradeStudent {
  id: number;
  /*
    "name": "RAQUEL NINFA",
  "lastNameFather": "MAMANI",
  "lastNameMother": "LIMACHI",
  "documentNumber": "02284997",
  */
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

// const mapStudentGrade = (grades: any) => {
//   gradeStudents.value = groupStudents.value.map((student) => {
//     const grade = grades.find((grade: any) => grade.studentId === student.id);
//     if (grade) {
//       student.capacityAverage = grade.capacityAverage;
//       student.attitudeGrade = grade.attitudeGrade;
//       student.finalGrade = grade.finalGrade;
//     }
//     return student;
//   });
// };

const updateFinalGrade = (index: number) => {
  let student = gradeStudents.value[index];

  if (group.value.curriculumId == 1) {
    // **Caso Curriculum ID = 1 (PF = 0.9 * PC + Actitudes)**
    let capacityGrades = student.gradeUnits.filter((g: any) => g.order !== 2); // Excluir actitud
    let totalCapacity = capacityGrades.reduce((sum: number, g: any) => sum + (parseFloat(g.grade) || 0), 0);
    let capacityAverage = capacityGrades.length > 0 ? totalCapacity / capacityGrades.length : 0;

    let attitudeUnit = student.gradeUnits.find((g: any) => g.order === 2);
    let attitude = attitudeUnit ? parseFloat(attitudeUnit.grade.toString()) || 0 : 0;

    student.finalGrade = parseFloat(((capacityAverage * 0.9) + attitude).toFixed(2));

  } else if (group.value.curriculumId == 2) {
    // **Caso Curriculum ID = 2 (PF = Promedio Simple)**
    let totalGrades = student.gradeUnits.reduce((sum: number, g: any) => sum + (parseFloat(g.grade) || 0), 0);
    let unitCount = student.gradeUnits.length;

    student.finalGrade = unitCount > 0 ? parseFloat((totalGrades / unitCount).toFixed(2)) : 0;
  }
};

const mapRequestGrade = () => {
  return gradeStudents.value.map((student) => {
    return {
      studentId: student.id,
      enrollmentGroupId: student.enrollmentGroupId,
      finalGrade: student.finalGrade,
    };
  });
};

const saveGrades = async () => {
  const grades = mapRequestGrade();
  await _saveGradeStudents({ grades: grades });
  await initView();
  console.log(grades);
};

const initView = async () => {
  loadingView.value = true;
  const id = route.params.id;
  group.value = await _getGroup(id);
  groupStudents.value = await _groupStudents(id);
  gradeStudents.value = (await _getGradeStudents(id)) as GradeStudent[];
  // mapStudentGrade(grades);
  loadingView.value = false;
};

onMounted(() => {
  initView();
});
</script>
