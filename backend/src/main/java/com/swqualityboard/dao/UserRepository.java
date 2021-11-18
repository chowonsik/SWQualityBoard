package com.swqualityboard.dao;

import com.swqualityboard.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmailAndStatus(String email, String status);
    boolean existsByEmailAndStatus(String email, String status);

    boolean existsByNicknameAndStatus(String nickname, String status);
}