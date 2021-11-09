package com.swqualityboard.dao;

import com.swqualityboard.entity.SystemQuality;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemQualityRepository extends MongoRepository<SystemQuality, String> {

}