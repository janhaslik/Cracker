package com.kubership.cracker.services;

import com.kubership.cracker.model.Ship;
import com.kubership.cracker.model.Ship_Shipment;
import com.kubership.cracker.model.Shipment;
import com.kubership.cracker.repository.ShipRepository;
import com.kubership.cracker.repository.Ship_ShipmentRepository;
import com.kubership.cracker.repository.ShipmentRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private Ship_ShipmentRepository ship_shipmentRepository;
    @Autowired
    private ShipRepository shipRepository;

    public List<Ship_Shipment> getShipmentsByOwner(int ownerid) {
        if (ownerid < 0) return null;

        return ship_shipmentRepository.findByShip_Owner(ownerid);
    }

    public List<Ship_Shipment> getShipmentsByShipnr(int shipnr) {
        if (shipnr < 0) return null;

        return ship_shipmentRepository.findByShip_Shipnr(shipnr);
    }

    public Ship_Shipment insertShipment(Ship_Shipment shipShipment) {
        if (shipShipment == null) return null;

        Shipment shipment = shipShipment.getShipment();
        Ship ship = shipRepository.findShipByShipnr(shipShipment.getShip().getShipnr());

        if (shipment == null || ship == null) return null;

        Optional<Shipment> existingShipment = shipmentRepository.findById(shipment.getShipmentid());
        if (existingShipment.isPresent()) return null; // Shipment already exists, return null or handle accordingly

        shipment = shipmentRepository.save(shipment);

        shipShipment.setShipment(shipment);
        shipShipment.setShip(ship);

        return ship_shipmentRepository.save(shipShipment);
    }

    public Ship_Shipment updateShipment(Ship_Shipment shipShipment) {
        Optional<Ship_Shipment> shipmentOptional = ship_shipmentRepository.findById(shipShipment.getId());

        if (shipmentOptional.isEmpty()) {
            return null;
        }

        Ship_Shipment existingShipment = shipmentOptional.get();
        existingShipment.setShipment(shipShipment.getShipment());
        existingShipment.setShip(shipShipment.getShip());

        return ship_shipmentRepository.save(existingShipment);
    }

    public boolean deleteShipment(int shipShipmentId){
        if(shipShipmentId<0)return false;

        Optional<Ship_Shipment> savedShipShipment=ship_shipmentRepository.findById(shipShipmentId);

        if(savedShipShipment.isEmpty())return false;

        shipmentRepository.delete(savedShipShipment.get().getShipment());

        ship_shipmentRepository.delete(savedShipShipment.get());

        return true;
    }
}
