package com.swqualityboard.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.swqualityboard.dto.common.PaginationDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@JsonPropertyOrder({ "isSuccess", "statusCode", "message", "page", "result", "timestamp" })
public class PageResponse<T> {
    @JsonProperty(value = "isSuccess")
    private boolean isSuccess;
    private int statusCode;
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private PaginationDto page;
    @JsonInclude(JsonInclude.Include.NON_NULL)

    private List<T> result;
    private Date timestamp;

    /*
     * 성공 시 호출
     */
    public PageResponse(Page<T> inputPage, ResponseStatus status) {
        this.isSuccess = true;
        this.statusCode = status.getStatusCode();
        this.message = status.getMessage();
        this.page = PaginationDto.of(inputPage);
        this.result = inputPage.getContent();
        this.timestamp = new Date();
    }

    /*
     * 실패 시 호출
     */
    public PageResponse(ResponseStatus status) {
        this.isSuccess = false;
        this.statusCode = status.getStatusCode();
        this.message = status.getMessage();
        this.timestamp = new Date();
    }
}
