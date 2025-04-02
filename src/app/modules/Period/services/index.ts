import { http } from "@/core/http";

const modulePath = "period" as const;

export const _getAll = async (): Promise<any> => {
  try {
    const response = await http().get(`/${modulePath}/all`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const _getPeriodsByTeacher = async (): Promise<any> => {
  try {
    const response = await http().get(`/${modulePath}/by-teacher`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};
