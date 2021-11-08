package com.swqualityboard.dao;

import com.swqualityboard.entity.System;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemRepository extends MongoRepository<System, String> {


}