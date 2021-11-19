package com.display.swqualityboardbatch.dao.mongo;

import com.display.swqualityboardbatch.entity.mongo.System;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemRepository extends MongoRepository<System, String> {

    Optional<System> findByName(String name);
}