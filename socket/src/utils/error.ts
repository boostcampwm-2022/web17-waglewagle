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

class DuplicatedKeywordError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.Keyword_Already_Existing);
  }
}

export { DuplicatedKeywordError, IllegalInputError };
