package com.waglewagle.rest.common.error;

import com.waglewagle.rest.community.exception.AlreadyJoinedCommunityException;
import com.waglewagle.rest.community.exception.NoSuchCommunityException;
import com.waglewagle.rest.community.exception.UnSubscribedCommunityException;
import com.waglewagle.rest.keyword.exception.AlreadyJoinedKeywordException;
import com.waglewagle.rest.keyword.exception.DuplicatedKeywordException;
import com.waglewagle.rest.keyword.exception.NoSuchKeywordException;
import com.waglewagle.rest.thread.exception.InvalidThreadException;
import com.waglewagle.rest.thread.exception.NoSuchThreadException;
import com.waglewagle.rest.user.exception.DuplicatedUsernameException;
import com.waglewagle.rest.user.exception.NoSuchUserException;
import com.waglewagle.rest.user.exception.UnauthorizedException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleNoSuchElementException(final NoSuchElementException e) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(e.getMessage()));
    }

    /**
     * Keyword Exception
     */
    @ExceptionHandler(NoSuchKeywordException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleNoSuchKeywordException(final NoSuchKeywordException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(DuplicatedKeywordException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleDuplicatedKeywordException(final DuplicatedKeywordException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(AlreadyJoinedKeywordException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleAlreadyJoinedKeywordException(final AlreadyJoinedKeywordException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    /**
     * Community Exceptions
     */
    @ExceptionHandler(NoSuchCommunityException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleNoSuchCommunityException(final NoSuchCommunityException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(UnSubscribedCommunityException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleUnSubscribedCommunityException(final UnSubscribedCommunityException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(AlreadyJoinedCommunityException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleAlreadyJoinedCommunityException(final AlreadyJoinedCommunityException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    /**
     * Thread Exception
     */
    @ExceptionHandler(NoSuchThreadException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleNoSuchThreadException(final NoSuchThreadException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(InvalidThreadException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleInvalidThreadException(final InvalidThreadException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    /**
     * User Exception
     */
    @ExceptionHandler(NoSuchUserException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleNoSuchCommunityException(final NoSuchUserException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleUnauthorizedException(final UnauthorizedException e) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(DuplicatedUsernameException.class)
    protected final ResponseEntity<ExceptionResponse>
    handleDuplicatedUsername(final DuplicatedUsernameException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(e.getMessage()));
    }

    @Getter
    @RequiredArgsConstructor
    private static final class ExceptionResponse {

        private final String message;
    }
}
