import { errorMessageEnum } from './error-message.enum';

class CustomSocketServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class IllegalInputError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.Illegal_Input_Error);
  }
}

class UnauthorizedError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.Unauthorized_Error);
  }
}

class ForbiddenError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.Forbidden_Error);
  }
}

class CommunityNotExistingError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.Community_Not_Existing);
  }
}

class AlreadySelectedKeywordError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.Already_Selected_Keyword);
  }
}

export {
  IllegalInputError,
  UnauthorizedError,
  CommunityNotExistingError,
  AlreadySelectedKeywordError,
  ForbiddenError,
};
