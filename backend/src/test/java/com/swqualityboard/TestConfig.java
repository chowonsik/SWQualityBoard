package com.swqualityboard;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mapping.context.MappingContext;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;

import static org.mockito.Mockito.mock;

@TestConfiguration
@SuppressWarnings("unchecked")
public class TestConfig {
    @Bean
    public MappingMongoConverter mongoConverter() {
        return new MappingMongoConverter(mock(DbRefResolver.class), mock(MappingContext.class));
    }
}
