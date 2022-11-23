const createSuccessfulResponseTemplate = (data: any) => ({
  success: true,
  data,
});

const createFailedResponseTemplate = (error: any) => ({
  success: false,
  errorMessage: error?.message,
});

export { createSuccessfulResponseTemplate, createFailedResponseTemplate };
