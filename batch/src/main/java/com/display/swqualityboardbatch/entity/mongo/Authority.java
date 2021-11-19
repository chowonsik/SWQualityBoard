package com.display.swqualityboardbatch.entity.mongo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@Document(collection = "authority")
public class Authority {

    @Id
    private String id;

    @Indexed(unique = true, direction = IndexDirection.DESCENDING)
    private String role; // 권한 이름
}
