import {
  reportValidations,
  ReportValidationType,
} from "@/validations/miscellaneousValidations";

export const bugReportAction = async (formData: ReportValidationType) => {
  const { data, success, error } = await reportValidations.safeParseAsync(
    formData
  );

  if (!success) {
    return {
      success: false,
      error: error.issues.map((issue) => {
        return { path: issue.path[0], message: issue.message };
      }),
    };
  }

  //complete method later
};
