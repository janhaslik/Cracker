package com.kubership.cracker.services;

import com.kubership.cracker.model.Ship_Shipment;
import com.kubership.cracker.model.Shipment;
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

    public List<Ship_Shipment> getShipmentsByOwner(int ownerid) {
        if (ownerid < 0) return null;

        return ship_shipmentRepository.findByShip_Owner(ownerid);
    }


    public Shipment insertShipment(Ship_Shipment shipShipment){
        if(shipShipment==null)return null;

        Optional<Shipment> shipmentExists=shipmentRepository.findById(shipShipment.getShipment().getShipmentid());

        if(shipmentExists.isPresent())return null;

        Ship_Shipment savedShipShipment=ship_shipmentRepository.save(shipShipment);

        return shipmentRepository.save(savedShipShipment.getShipment());
    }
}
