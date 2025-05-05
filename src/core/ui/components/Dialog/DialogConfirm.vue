<template>
  <v-dialog
    v-model="dialog"
    max-width="380"
    activator="parent"
    :persistent="true"
  >
    <v-card prepend-icon="mdi-alert-circle" :title="title">
      <template #prepend>
        <LnxIcon iconName="info-circle"></LnxIcon>
      </template>
      <v-card-item class="text-center border-t border-b">
        <p v-html="message"></p>
      </v-card-item>
      <slot></slot>
      <v-card-actions>
        <v-btn
          type="button"
          color="secondary"
          variant="text"
          @click="dialog = false && emit('onCancel')"
          :disabled="loading"
        >
          {{ textCancel }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          type="button"
          color="primary"
          @click="onConfirm"
          :loading="loading"
        >
          {{ textConfirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["onConfirm", "onCancel"]);

defineProps({
  title: {
    type: String,
    required: true,
    default: "Confirmar",
  },
  textCancel: {
    type: String,
    default: "Cancelar",
  },
  textConfirm: {
    type: String,
    default: "Aceptar",
  },
  message: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const dialog = ref<boolean>(false);

const onConfirm = () => {
  dialog.value = false;
  emit("onConfirm");
};
</script>
