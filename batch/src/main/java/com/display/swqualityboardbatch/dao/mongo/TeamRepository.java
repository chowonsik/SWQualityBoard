package com.display.swqualityboardbatch.dao.mongo;


import com.display.swqualityboardbatch.entity.mongo.Team;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends MongoRepository<Team, String> {
    Optional<Team> findByName(String name);

}