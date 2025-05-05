<template>
  <v-container>
    <DataTable />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "@/app/modules/Group/components/DataTable/DataTable.vue";
import { useHeadingStore } from "@/app/store/heading.store";

const headingStore = useHeadingStore();

const loadingView = ref<boolean>(false);

const initView = async () => {
  headingStore.setHeading("Grupos Asignados", `Lista de grupos asignados`);
  loadingView.value = true;
  loadingView.value = false;
};

onMounted(() => {
  initView();
});
</script>
