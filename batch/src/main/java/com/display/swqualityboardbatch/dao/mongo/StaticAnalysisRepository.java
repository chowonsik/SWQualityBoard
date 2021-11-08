package com.display.swqualityboardbatch.dao.mongo;

import com.display.swqualityboardbatch.entity.mongo.StaticAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaticAnalysisRepository extends MongoRepository<StaticAnalysis, String> {


}