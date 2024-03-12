package com.kubership.cracker.repository;

import com.kubership.cracker.model.Ship_CrewMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Ship_CrewMemberRepository extends JpaRepository<Ship_CrewMember, Integer> {

    List<Ship_CrewMember> findShip_CrewMemberByShip_Shipnr(int shipnr);
}
