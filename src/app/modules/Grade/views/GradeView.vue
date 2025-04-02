<template>
  <v-card
    title="Calificaciones"
    subtitle="Gestión de calificaciones"
    class="rounded-0"
    elevation="0"
  />
  <v-container>
    <v-card>
      <v-card-item class="border-b">
        <v-row>
          <v-col cols="12" md="8">
            <h4>{{ group?.name }} {{ group?.course }}</h4>
            <span class="text-subtitle-2">
              {{ group?.curriculum }}
            </span>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="formSearch.unitOrder"
              :items="unitOptions"
              label="Unidad"
              hide-details
              @update:model-value="handleChageUnit"
            />
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-item>
        <v-table class="roudend-0">
          <thead class="roudend-0 bg-primary">
            <tr>
              <th>N°</th>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th style="width: 150px">Calification</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in unitGradeStudents" :key="student.id">
              <td>{{ index + 1 }}</td>
              <td>{{ student.documentNumber }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.lastNameFather }}</td>
              <td>{{ student.lastNameMother }}</td>
              <td class="border-s">
                <v-select
                  v-if="group.curriculumId == 1 && student.gradeUnit.order == 2"
                  v-model="student.gradeUnit.grade"
                  density="compact"
                  readonly
                  :items="[
                    { title: 'A', value: '2.00' },
                    { title: 'B', value: '1.00' },
                    { title: 'C', value: '0.00' },
                  ]"
                />
                <v-text-field
                  v-else
                  v-model.number="student.gradeUnit.grade"
                  type="number"
                  min="0"
                  max="20"
                  density="compact"
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
    </v-card>
    <pre>{{ unitOptions }}</pre> 
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  _getGroup,
  _getGradeStudentsByUnit,
} from "@/app/modules/Group/services/";

const route = useRoute();
const group = ref<any>(null);
const unitGradeStudents = ref<any>(null);
const formSearch = ref({
  groupId: null,
  unitOrder: null,
});

const unitOptions = ref<any>([]);
const mapUnitOptions = () => {
  for (let i = 1; i <= group?.value?.units; i++) {
    unitOptions.value.push({
      title:
        group.value.curriculumId === 1 && i == 1
          ? "Capacidades"
          : group.value.curriculumId === 1 && i == 2
          ? "Actitudes"
          : `Unidad ${i}`,
      value: i,
    });
    console.log(unitOptions.value);
  }
};

const handleChageUnit = async () => {
  console.log("handleChageUnit");
  formSearch.value.groupId = group?.value.id;
  //   unitGradeStudents.value = [];
  unitGradeStudents.value = await _getGradeStudentsByUnit(formSearch.value);
};

const initView = async () => {
  const id = route.params.id;
  group.value = await _getGroup(id);

  mapUnitOptions();
};

initView();
</script>
