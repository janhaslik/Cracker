package com.kubership.cracker.repository;

import com.kubership.cracker.model.CrewMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewMemberRepository extends JpaRepository<CrewMember, Integer> {

    List<CrewMember> getCrewMembersByShipShipnr(int shipnr);
}
