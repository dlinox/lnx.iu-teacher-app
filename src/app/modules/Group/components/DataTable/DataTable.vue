<template>
  <v-card>
    <LnxDataTable :headers="headers()" :loadDataTable="_loadDataTable">
      <template
        v-slot:header="{
          request,
          initDataTable,
          loadingTable,
          debouncedReload,
          reLoadDataTable,
        }"
      >
        <v-card-item class="border-t border-b">
          <v-row class="d-flex justify-space-between align-center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="request.search"
                label="Buscar"
                clearable
                @input="debouncedReload"
                @click:clear="reLoadDataTable"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="text-end">
              <v-btn
                icon
                variant="tonal"
                density="comfortable"
                rounded="lg"
                v-tooltip="'Recargar registros'"
                @click="initDataTable"
                :loading="loadingTable"
              >
                <LnxIcon iconName="refresh" />
              </v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn-group variant="tonal" divided density="compact">
          <v-btn icon v-tooltip:top="'Ver detalles'" :to="`/group/${item.id}`">
            <LnxIcon iconName="command" />
          </v-btn>
          <!-- <v-btn icon v-tooltip:top="'Asistencia'">
            <LnxIcon iconName="timer-1" />
          </v-btn>
          <v-btn icon v-tooltip:top="'Ver detalles'">
            <LnxIcon iconName="command" />
          </v-btn> -->
        </v-btn-group>
      </template>
    </LnxDataTable>
  </v-card>
</template>
<script setup lang="ts">
import { _loadDataTable } from "../../services";
import { headers } from "./config";
</script>
