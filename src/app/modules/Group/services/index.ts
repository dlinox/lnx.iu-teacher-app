import { http } from "@/core/http";

const modulePath = "groups" as const;

export const _getGroupsForTeacher = async (periodId: number): Promise<any> => {
  try {
    const response = await http().get(`${modulePath}/teacher`, {
      params: {
        periodId,
      },
    });
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const _getGroup = async (id: any): Promise<any> => {
  try {
    const response = await http().get(`${modulePath}/item/${id}`);
    return response.data.data;
  } catch (error) {
    return {};
  }
};

export const _groupStudents = async (id: any): Promise<any> => {
  try {
    const response = await http().get(`${modulePath}/students/${id}`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};
// Route::get('grade-students/{id}', [GroupController::class, 'getGradeStudents']);
export const _getGradeStudents = async (id: any): Promise<any> => {
  try {
    const response = await http().get(`${modulePath}/grade-students/${id}`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};

//_saveGradeStudents
export const _saveGradeStudents = async (data: any): Promise<any> => {
  try {
    const response = await http().post(
      `${modulePath}/grade-students/save`,
      data
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};
