package com.swqualityboard.dao;

import com.swqualityboard.dto.memo.MemoDto;
import com.swqualityboard.entity.Memo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemoRepository extends MongoRepository<Memo, String> {


    Optional<Memo> findBySystemQualityIdAndUserId(String systemId, String userId);

    boolean existsBySystemQualityIdAndUserId(String systemId, String userId);

    @Query(value="{ 'system_quality_id' : ?0, 'user_id' : ?1 }", fields="{ 'id' : 1, 'content' : 1}")
    Optional<MemoDto> findByMemo(String systemQualityId, String userId);
}