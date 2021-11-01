package com.swqualityboard.dao;

import com.swqualityboard.entity.Authority;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorityRepository extends MongoRepository<Authority, String> {

    Optional<Authority> findByRole(String role);
}