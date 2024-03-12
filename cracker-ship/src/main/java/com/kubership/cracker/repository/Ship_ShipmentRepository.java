package com.kubership.cracker.repository;

import com.kubership.cracker.model.Ship;
import com.kubership.cracker.model.Ship_Shipment;
import com.kubership.cracker.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Ship_ShipmentRepository extends JpaRepository<Ship_Shipment, Integer> {
    List<Ship_Shipment> findByShip_Owner(int owner);
}
