package com.kubership.cracker.controllers;

import com.kubership.cracker.model.Ship;
import com.kubership.cracker.model.Ship_CrewMember;
import com.kubership.cracker.model.Ship_Maintenance;
import com.kubership.cracker.model.Ship_Shipment;
import com.kubership.cracker.services.MaintenanceService;
import jdk.swing.interop.SwingInterOpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ships/maintenances")
@CrossOrigin("http://localhost:5173")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;
    @GetMapping
    public ResponseEntity<List<Ship_Maintenance>> getMaintenances(@RequestParam(name = "ownerid", required = false) Integer ownerid,
                                                                 @RequestParam(name="shipnr", required = false) Integer shipnr) {
        if (ownerid != null && shipnr == null) {
            if (ownerid < 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            List<Ship_Maintenance> maintenancesByOwner = maintenanceService.getMaintenancesByOwner(ownerid);
            if (maintenancesByOwner == null || maintenancesByOwner.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(maintenancesByOwner, HttpStatus.OK);
        } else{
            if (shipnr < 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            List<Ship_Maintenance> maintenancesByShipnr = maintenanceService.getMaintenancesByShipnr(shipnr);
            if (maintenancesByShipnr == null || maintenancesByShipnr.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(maintenancesByShipnr, HttpStatus.OK);
        }
    }

    @PostMapping()
    public ResponseEntity<Ship_Maintenance> insertMaintenance(@RequestBody Ship_Maintenance shipMaintenanceBody){
        if(shipMaintenanceBody==null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Ship_Maintenance crewMember=maintenanceService.insertMaintenance(shipMaintenanceBody);

        if(crewMember==null)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(crewMember, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<Ship_Maintenance> updateMaintenance(@RequestBody Ship_Maintenance shipMaintenanceBody){
        if(shipMaintenanceBody==null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Ship_Maintenance updatedShipMaintenance=maintenanceService.updateMaintenance(shipMaintenanceBody);

        if(updatedShipMaintenance==null)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(updatedShipMaintenance, HttpStatus.OK);
    }

    @DeleteMapping("/{maintenanceid}")
    public ResponseEntity deleteMaintenance(@PathVariable("maintenanceid") int maintenanceid){
        if(maintenanceid<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        boolean success= maintenanceService.deleteMaintenance(maintenanceid);
        if(!success)return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
