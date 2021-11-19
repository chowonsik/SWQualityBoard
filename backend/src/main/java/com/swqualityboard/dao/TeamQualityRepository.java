package com.swqualityboard.dao;

import com.swqualityboard.entity.TeamQuality;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamQualityRepository extends MongoRepository<TeamQuality, String> {


}