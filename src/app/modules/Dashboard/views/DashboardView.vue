<template>
  <v-card
    title="Bienvenido"
    subtitle="Instituto de Informática UNA - PUNO"
    class="rounded-0"
    elevation="0"
  />
  <v-container>
    <v-card elevation="0" class="rounded-0 border">
      <v-card-item>
        <v-row justify="space-between">
          <v-col cols="12" md="7">
            <v-card-title>Grupos</v-card-title>
            <v-card-subtitle>Lista de grupos asignados</v-card-subtitle>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="periodId"
              label="Periodos"
              :items="periods"
              hide-details="auto"
              @update:model-value="getGroups"
            />
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <v-card v-if="groups.length > 0" elevation="0" class="rounded-0 border">
      <v-card-item class="border-b" v-for="group in groups" :key="group.id">
        <v-row>
          <v-col cols="8" md="6">
            <v-card-subtitle>
              <v-chip color="primary" rounded="0" label>
                {{ group.modality }}
              </v-chip>
            </v-card-subtitle>
            <v-card-title>
              <small> {{ group.name }} </small> | {{ group.course }}
            </v-card-title>
            <v-card-subtitle>
              <b>Modulo: </b>{{ group.module }}
            </v-card-subtitle>
            <v-card-subtitle> <b>Area: </b> {{ group.area }} </v-card-subtitle>
          </v-col>
          <v-col cols="8" md="4" class="align-self-end">
            <v-card-subtitle
              v-for="schedule in group.schedules"
              :key="schedule.id"
            >
              <b> {{ schedule.day }} </b> {{ schedule.start_hour }} -
              {{ schedule.end_hour }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="12" md="2" class="align-self-center">
            <v-btn color="primary" block link :to="`/group/${group.id}`">
              ver grupo
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <v-empty-state
      v-else
      headline="Sin datos"
      :text="`No se encontraron grupos asignados para este periodo seleccionado`"
      title="No hay grupos"
    ></v-empty-state>
  </v-container>
</template>

<script setup lang="ts">
import {  ref } from "vue";
import { usePeriodStore } from "@/app/store/period.stores";
import { _getAll } from "@/app/modules/Period/services";
import { _getGroupsForTeacher } from "@/app/modules/Group/services";

const periodStore = usePeriodStore();

const periods = ref<any[]>([]);
const groups = ref<any[]>([]);
const periodId = ref<number | null>(null);

const getGroups = async () => {
  groups.value = await _getGroupsForTeacher(periodId.value as number);
};

const initView = async () => {
  periods.value = await _getAll();
  periodId.value = periodStore.current?.id;
  await getGroups();
};

initView();
</script>
