import { ref } from "vue";
import { defineStore } from "pinia";
import { _getGradeDeadline } from "@/app/modules/Group/services";
export const usePeriodStore = defineStore("period", () => {
  const current = ref<any | null>(null);
  const gradeDeadline = ref<any | null>(null);
  const enrolled = ref<any | null>(null);
  const getCurrent = async () => {
    current.value = null;
  };

  const getGradeDeadline = async () => {
    gradeDeadline.value = await _getGradeDeadline();
  };
  
  const getEnrolled = async () => {
    enrolled.value = null;
  };
  return {
    current,
    getCurrent,
    enrolled,
    getEnrolled,
    gradeDeadline,
    getGradeDeadline,
  };
});
