package com.kubership.cracker.services;

import com.kubership.cracker.model.Shipment;
import com.kubership.cracker.repository.ShipmentRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    public List<Shipment> getShipmentsByOwner(int ownerid) {
        if (ownerid < 0) return null;

        List<Shipment> shipments = shipmentRepository.findAll();

        shipments=shipments.stream().filter(f->f.getShip().getOwner()==ownerid).toList();

        return shipments;
    }


    public Shipment insertShipment(Shipment shipment){
        if(shipment==null)return null;

        Optional<Shipment> shipmentExists=shipmentRepository.findById(shipment.getShipmentid());

        if(shipmentExists.isPresent())return null;

        return shipmentRepository.save(shipment);
    }
}
