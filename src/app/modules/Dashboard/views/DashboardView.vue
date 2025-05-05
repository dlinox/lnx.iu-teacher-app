<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="7">
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
        <v-card
          v-if="groups.length > 0"
          elevation="0"
          class="rounded-0 border mb-3"
          v-for="group in groups"
          :key="group.id"
        >
          <v-card-item class="border-b">
            <v-card-subtitle>
              <v-chip color="primary" rounded="0" label>
                {{ group.modality }}
              </v-chip>
            </v-card-subtitle>
            <v-card-title>
              <strong> {{ group.name }} </strong> | {{ group.course }}
            </v-card-title>

            <v-card-subtitle>
              <b>Plan de estudio: </b> {{ group.curriculum }}
            </v-card-subtitle>
            <v-card-subtitle>
              <b>Modulo: </b>{{ group.module }}
            </v-card-subtitle>
            <v-card-subtitle> <b>Area: </b> {{ group.area }} </v-card-subtitle>
            <v-card-subtitle>
              <b>Horario: </b> {{ group.schedules?.days }}
              {{ group.schedules?.startHour }}-{{ group.schedules?.endHour }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-actions>
            <v-spacer> </v-spacer>
            <v-btn color="primary" link :to="`/group/${group.id}`">
              ver grupo
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-empty-state
          v-else
          headline="Sin datos"
          title="Seleccione un periodo"
        ></v-empty-state>
      </v-col>
      <v-col cols="12" md="5">
        <v-card elevation="0" class="rounded-0 border py-1">
          <v-card-title>Grupos Activos</v-card-title>
          <v-card-subtitle>Lista de grupos activos asignados</v-card-subtitle>
        </v-card>
        <v-card
          v-if="groupsActive.length > 0"
          elevation="0"
          class="rounded-0 border mb-3"
          v-for="group in groupsActive"
          :key="group.id"
        >
          <v-card-item class="border-b">
            <v-card-subtitle>
              <v-chip color="primary" rounded="0" label>
                {{ group.modality }}
              </v-chip>
            </v-card-subtitle>
            <v-card-title>
              <strong> {{ group.name }} </strong> | {{ group.course }}
            </v-card-title>

            <v-card-subtitle>
              <b>Plan de estudio: </b> {{ group.curriculum }}
            </v-card-subtitle>
            <v-card-subtitle>
              <b>Modulo: </b>{{ group.module }}
            </v-card-subtitle>
            <v-card-subtitle> <b>Area: </b> {{ group.area }} </v-card-subtitle>
            <v-card-subtitle>
              <b>Horario: </b> {{ group.schedules?.days }}
              {{ group.schedules?.startHour }}-{{ group.schedules?.endHour }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-actions>
            <v-spacer> </v-spacer>
            <v-btn color="primary" link :to="`/group/${group.id}`">
              ver grupo
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-empty-state
          v-else
          headline="Sin datos"
          title="No tiene grupos activos"
        ></v-empty-state>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePeriodStore } from "@/app/store/period.stores";
import { _getPeriodsByTeacher } from "@/app/modules/Period/services";
import {
  _getGroupsForTeacher,
  _getActiveGroupsForTeacher,
} from "@/app/modules/Group/services";

import { useHeadingStore } from "@/app/store/heading.store";

const headingStore = useHeadingStore();
const periodStore = usePeriodStore();

const periods = ref<any[]>([]);
const groups = ref<any[]>([]);

const groupsActive = ref<any[]>([]);

const periodId = ref<number | null>(null);

const getGroups = async () => {
  groups.value = await _getGroupsForTeacher(periodId.value as number);
};

const initView = async () => {
  headingStore.setHeading("Mi panel", `Bienvenido`);

  periods.value = await _getPeriodsByTeacher();
  groupsActive.value = await _getActiveGroupsForTeacher();
  periodId.value = periodStore.current?.id;
  await getGroups();
};

initView();
</script>
