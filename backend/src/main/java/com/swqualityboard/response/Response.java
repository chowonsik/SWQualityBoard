package com.swqualityboard.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@JsonPropertyOrder({"isSuccess", "statusCode", "message", "result", "timestamp"})
public class Response<T> {
    @JsonProperty(value = "isSuccess")
    private boolean isSuccess;
    private int statusCode;
    private String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T result;
    private Date timestamp;

    /*
     성공 시 호출
     */
    public Response(T result, ResponseStatus status) {
        this.isSuccess = true;
        this.statusCode = status.getStatusCode();
        this.message = status.getMessage();
        this.result = result;
        this.timestamp = new Date();
    }

    /*
     실패 시 호출
     */
    public Response(ResponseStatus status) {
        this.isSuccess = false;
        this.statusCode = status.getStatusCode();
        this.message = status.getMessage();
        this.timestamp = new Date();
    }
}
