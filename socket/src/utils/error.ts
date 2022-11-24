import { errorMessageEnum } from './error-message.enum';

class CustomSocketServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class UnauthorizedError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.UNAUTHORIZED);
  }
}

class ForbiddenError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.FORBIDDEN);
  }
}

class CommunityNotExistingError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.COMMUNITY_NOT_EXISTING);
  }
}

class AlreadySelectedKeywordError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.AlREADY_SELECTED_KEYWORD);
  }
}

class KeywordNotExistingError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.KEYWORD_NOT_EXiSTING);
  }
}

class KeywordNotSelectedError extends CustomSocketServerError {
  constructor() {
    super(errorMessageEnum.KEYWORD_NOT_SELECTED);
  }
}

export {
  UnauthorizedError,
  CommunityNotExistingError,
  AlreadySelectedKeywordError,
  ForbiddenError,
  KeywordNotExistingError,
  KeywordNotSelectedError,
};
