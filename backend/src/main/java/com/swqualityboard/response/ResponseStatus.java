package com.swqualityboard.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 HTTP 에러 코드
 */
@AllArgsConstructor
@Getter
public enum ResponseStatus {
    /*
     * 2XX Success
     */
    // 200 OK - 클라이언트의 요청을 서버가 정상적으로 처리했다.
    SUCCESS(200, "요청에 성공하였습니다."),
    SUCCESS_SIGN_IN(200, "로그인에 성공하였습니다."),
    SUCCESS_SELECT_SYSTEM(200, "시스템 품질지표 조회에 성공하였습니다."),
    SUCCESS_UPDATE_MEMO(200, "메모 수정에 성공하였습니다."),
    SUCCESS_DELETE_MEMO(200, "메모 삭제에 성공하였습니다."),
    SUCCESS_SELECT_USER(200, "유저 조회에 성공하였습니다."),

    // 201 Created - 클라이언트의 요청을 서버가 정상적으로 처리했고 새로운 리소스가 생겼다.,
    CREATED(201, "리소스 생성에 성공하였습니다."),
    CREATED_USER(201, "유저 생성에 성공하였습니다."),
    CREATED_MEMO(201, "메모 생성에 성공하였습니다."),

    // 202 Accepted - 클라이언트의 요청은 정상적이나, 서버가 아직 요청을 완료하지 못했다. 비동기
    ACCEPTED(202, "요청에 성공하였습니다."),

    // 204 No Content - 클라이언트의 요청은 정상적이다. 하지만 컨텐츠를 제공하지 않는다.
    NO_CONTENT(204, "요청에 성공하였습니다."),

    /*
     * 4XX Client errors
     */
    // 400 Rad Request - 클라이언트의 요청이 유효하지 않아 더 이상 작업을 진행하지 않는 경우
    BAD_REQUEST(400, "요청에 실패하였습니다."),
    FAILED_TO_REQUEST(400, "데이터를 불러오는데 실패하였습니다."),
    FAILED_TO_CREATE_TOKEN(400, "토큰 생성에 실패하였습니다."),
    FAILED_TO_SIGN_IN(400, "로그인에 실패하였습니다."),
    NO_VALUES(400, "입력되지 않은 값이 존재합니다."),
    NO_CONTENTS(400, "내용을 입력해주세요."),
    BAD_ACCESS_TOKEN_VALUE(400, "accessToken을 입력해주세요."),
    BAD_EMAIL_VALUE(400, "올바른 이메일을 입력해주세요."),
    BAD_PASSWORD_VALUE(400, "올바른 비밀번호를 입력해주세요."),
    BAD_NAME_VALUE(400, "올바른 이름을 입력해주세요."),
    VALIDATION_FAILED(400, "Validation Failed."),

    // 401 Unauthorized - 클라이언트가 권한이 없기 때문에 작업을 진행할 수 없는 경우
    UNAUTHORIZED(401, "권한이 없습니다."),
    UNAUTHORIZED_TOKEN(401, "유효하지 않은 토큰입니다."),
    UNAUTHORIZED_USER(401, "인증되지 않은 유저입니다."),
    UNAUTHORIZED_BAD_CREDENTIALS(401, "자격 증명에 실패하였습니다."),
    // 403 Forbidden - 클라이언트가 권한이 없기 때문에 작업을 진행할 수 없는 경우
    FORBIDDEN(403, "권한이 없습니다."),
    FORBIDDEN_ACCESS(403, "접근이 거부되었습니다."),
    FORBIDDEN_USER_ID(403, "해당 userId에 대한 권한이 없습니다."),
    FORBIDDEN_BOOKMARK_ID(403, "해당 bookmarkId에 대한 권한이 없습니다."),

    // 404 Not Found - 클라이언트가 요청한 자원이 존재하지 않다.
    NOT_FOUND(404, "NOT FOUND"),
    NOT_FOUND_USER(404, "해당하는 이메일을 가진 유저가 존재하지 않습니다."),
    NOT_FOUND_AUTHORITY(404, "권한을 찾을 수 없습니다."),
    NOT_FOUND_TEAM(404, "해당 팀을 찾을 수 없습니다."),
    NOT_FOUND_SYSTEM(404, "해당 시스템을 찾을 수 없습니다."),
    NOT_FOUND_MEMO(404, "해당 메모를 찾을 수 없습니다."),

    // 405 Method Not Allowed - 클라이언트의 요청이 허용되지 않는 메소드인 경우
    METHOD_NOT_ALLOWED(405, "허용되지 않는 HTTP Method 입니다."),

    // 409 Conflict - 클라이언트의 요청이 서버의 상태와 충돌이 발생한 경우
    CONFLICT(409, "충돌이 발생하였습니다."),
    EXISTS_EMAIL(409, "이미 존재하는 이메일입니다."),
    EXISTS_NICKNAME(409, "이미 존재하는 닉네임입니다."),
    EXISTS_MEMO(409, "해당 SW 품질지표 이력에 메모가 존재하고 있습니다."),

    // 429 Too Many Requests - 클라이언트가 일정 시간 동안 너무 많은 요청을 보낸 경우
    TOO_MANY_REQUESTS(429, "요청이 너무 많습니다."),

    /*
     * 5XX Server errors
     */
    // 500 내부 서버 오류가 발생한 경우
    SERVER_ERROR(500, "서버와의 통신에 실패하였습니다."),
    INFOTECH_SERVER_ERROR(500, "서버와의 통신에 실패하였습니다."),
    DATABASE_ERROR(500, "데이터베이스 연결에 실패하였습니다.");

    private final int statusCode;
    private final String message;
}