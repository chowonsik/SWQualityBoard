package com.display.swqualityboardbatch.dao.mongo;

import com.display.swqualityboardbatch.entity.mongo.Authority;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorityRepository extends MongoRepository<Authority, String> {

    Optional<Authority> findByRole(String role);
}