package com.kubership.cracker.repository;

import com.kubership.cracker.model.Ship;
import com.kubership.cracker.model.Shipment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {
    @Query("SELECT shipment FROM Shipment shipment JOIN shipment.ship ship WHERE ship.owner = :ownerId")
    List<Shipment> findByShip_Owner(@Param("ownerId") int owner);
}
