package com.swqualityboard.dao;

import com.swqualityboard.dto.system.SystemDto;
import com.swqualityboard.entity.System;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemRepository extends MongoRepository<System, String> {


    @Query(value="{ 'id' : ?0 }", fields="{ 'id' : 1, 'name' : 1}")
    Optional<SystemDto> findBySystemId(String systemId);
}