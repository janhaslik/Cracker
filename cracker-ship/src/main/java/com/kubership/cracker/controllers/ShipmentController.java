package com.kubership.cracker.controllers;

import com.kubership.cracker.model.Ship_Shipment;
import com.kubership.cracker.model.Shipment;
import com.kubership.cracker.repository.Ship_ShipmentRepository;
import com.kubership.cracker.repository.ShipmentRepository;
import com.kubership.cracker.services.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/ships/shipments")
@CrossOrigin("http://localhost:5173")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @GetMapping()
    public ResponseEntity<List<Ship_Shipment>> getShipments(@RequestParam("ownerid") int ownerid){
        if(ownerid<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        List<Ship_Shipment> shipments=shipmentService.getShipmentsByOwner(ownerid);

        if(shipments==null)return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(shipments, HttpStatus.OK);
    }
}
