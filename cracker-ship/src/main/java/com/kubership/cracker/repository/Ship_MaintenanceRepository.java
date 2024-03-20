package com.kubership.cracker.repository;

import com.kubership.cracker.model.Ship_Maintenance;
import com.kubership.cracker.model.Ship_Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Ship_MaintenanceRepository extends JpaRepository<Ship_Maintenance, Integer> {

    List<Ship_Maintenance> findByShip_Owner(int owner);
    List<Ship_Maintenance> findByShip_Shipnr(int shipnr);
}
