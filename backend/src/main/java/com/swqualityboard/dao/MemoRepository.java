package com.swqualityboard.dao;

import com.swqualityboard.entity.Memo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemoRepository extends MongoRepository<Memo, String> {


    Optional<Memo> findBySystemIdAndUserId(String systemId, String userId);
}