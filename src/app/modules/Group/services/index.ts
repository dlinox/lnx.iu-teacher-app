import { http } from "@/core/http";

import type {
  DataTableRequestDTO,
  DataTableResponseDTO,
} from "@/core/types/DataTable.types";

const modulePath = "groups" as const;

export const _loadDataTable = async (
  request: DataTableRequestDTO
): Promise<DataTableResponseDTO<any>> => {
  try {
    const response = await http().post(`${modulePath}/load-data`, request);
    return response.data.data as DataTableResponseDTO<any>;
  } catch (error) {
    return {} as DataTableResponseDTO<any>;
  }
};

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

// Route::post('attendance-students/save', [GroupController::class, 'saveAttendanceStudents']);
export const _saveAttendanceStudents = async (data: any): Promise<any> => {
  try {
    const response = await http().post(
      `${modulePath}/attendance-students/save`,
      data
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const _getActiveGroupsForTeacher = async (): Promise<any> => {
  try {
    const response = await http().get(
      `${modulePath}/active-groups-for-teacher`
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const _getGradeStudentsByUnit = async (data: any): Promise<any> => {
  try {
    const response = await http().post(
      `${modulePath}/unit-grade-students`,
      data
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const _getAttendanceStudents = async (data: any): Promise<any> => {
  try {
    const response = await http().post(
      `${modulePath}/attendance-students`,
      data
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const _saveAcademicRecordPdf = async (request: any): Promise<any> => {
  try {
    const response = await http().post(
      `${modulePath}/academic-record-pdf`,
      request,
      {
        responseType: "blob",
      }
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    const timestamp = new Date().getTime();
    a.href = url;
    a.download = `reporte-academico.pdf-${timestamp}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    return null;
  }
};

export const _lastAcademicRecordPdf = async (id: any): Promise<any> => {
  try {
    const response = await http().get(
      `${modulePath}/last-academic-record-pdf/${id}`,
      {
        responseType: "blob",
      }
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    const timestamp = new Date().getTime();
    a.href = url;
    a.download = `reporte-academico.pdf-${timestamp}.pdf`; // Cambia el nombre del archivo aquí
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    return null;
  }
};
export const _getGradeDeadline = async (): Promise<any> => {
  try {
    const response = await http().get(`${modulePath}/grade-deadline`);
    return response.data.data;
  } catch (error) {
    return null;
  }
};
