package com.kubership.cracker.repository;

import com.kubership.cracker.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {

    List<Shipment> getShipmentsByShipnrOwner(int owner);
}
