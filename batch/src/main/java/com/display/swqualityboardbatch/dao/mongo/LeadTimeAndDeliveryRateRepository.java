package com.display.swqualityboardbatch.dao.mongo;

import com.display.swqualityboardbatch.entity.mongo.LeadTimeAndDeliveryRate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadTimeAndDeliveryRateRepository extends MongoRepository<LeadTimeAndDeliveryRate, String> {


}