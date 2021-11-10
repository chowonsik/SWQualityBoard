package com.swqualityboard.dao;

import com.swqualityboard.dto.team.TeamDto;
import com.swqualityboard.entity.Team;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends MongoRepository<Team, String> {
    Optional<Team> findByName(String name);

    @Query(value="{ 'id' : ?0 }", fields="{ 'id' : 1, 'name' : 1}")
    Optional<TeamDto> findByTeamId(String teamId);

}