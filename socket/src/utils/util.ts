const createFailedResponseTemplate = (error: any) => ({
  success: false,
  errorMessage: error?.message,
});

export { createFailedResponseTemplate };
