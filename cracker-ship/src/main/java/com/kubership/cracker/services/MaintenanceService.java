package com.kubership.cracker.services;

import com.kubership.cracker.model.*;
import com.kubership.cracker.repository.*;
import com.sun.tools.javac.Main;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private Ship_MaintenanceRepository ship_maintenanceRepository;

    @Autowired
    private ShipRepository shipRepository;

    public List<Ship_Maintenance> getMaintenancesByOwner(int ownerid) {
        if (ownerid < 0) return null;

        return ship_maintenanceRepository.findByShip_Owner(ownerid);
    }

    public List<Ship_Maintenance> getMaintenancesByShipnr(int shipnr) {
        if (shipnr < 0) return null;
        List<Ship_Maintenance> test=ship_maintenanceRepository.findByShip_Shipnr(shipnr);
        System.out.println("test: "+test);
        return ship_maintenanceRepository.findByShip_Shipnr(shipnr);
    }
    public Ship_Maintenance insertMaintenance(Ship_Maintenance shipMaintenance) {
        if (shipMaintenance == null) return null;

        Maintenance maintenance = shipMaintenance.getMaintenance();
        Ship ship = shipRepository.findShipByShipnr(shipMaintenance.getShip().getShipnr());

        if (maintenance == null || ship == null) return null;

        Optional<Maintenance> existingMaintenance= maintenanceRepository.findById(maintenance.getMaintenanceid());
        if (existingMaintenance.isPresent()) return null; // Shipment already exists, return null or handle accordingly

        maintenance = maintenanceRepository.save(maintenance);

        shipMaintenance.setMaintenance(maintenance);
        shipMaintenance.setShip(ship);

        return ship_maintenanceRepository.save(shipMaintenance);
    }

    public Ship_Maintenance updateMaintenance(Ship_Maintenance shipMaintenance) {
        Optional<Ship_Maintenance> shipmentOptional = ship_maintenanceRepository.findById(shipMaintenance.getId());

        if (shipmentOptional.isEmpty()) {
            return null;
        }

        Ship_Maintenance existingShipment = shipmentOptional.get();
        existingShipment.setMaintenance(shipMaintenance.getMaintenance());
        existingShipment.setShip(shipMaintenance.getShip());

        return ship_maintenanceRepository.save(existingShipment);
    }

    public boolean deleteMaintenance(int maintenanceId){
        if(maintenanceId<0)return false;

        Optional<Ship_Maintenance> savedShipMaintenance=ship_maintenanceRepository.findById(maintenanceId);
        if(savedShipMaintenance.isEmpty())return false;

        maintenanceRepository.delete(savedShipMaintenance.get().getMaintenance());

        ship_maintenanceRepository.delete(savedShipMaintenance.get());

        return true;
    }
}
