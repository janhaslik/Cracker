package com.kubership.cracker.repository;

import com.kubership.cracker.model.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipRepository extends JpaRepository<Ship, Integer> {

    List<Ship> findShipsByOwner(int owner);
    Ship findShipByShipnr(int shipnr);
}
