package com.kubership.cracker.controllers;

import com.kubership.cracker.model.Shipment;
import com.kubership.cracker.repository.ShipmentRepository;
import com.kubership.cracker.services.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin("http://localhost:5173")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;
    @Autowired
    private ShipmentRepository shipmentRepository;

    @GetMapping()
    public ResponseEntity<List<Shipment>> getShipments(@RequestParam("ownerid") int ownerid){
        if(ownerid<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        List<Shipment> shipments=shipmentService.getShipmentsByOwner(ownerid);

        if(shipments==null)return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(shipments, HttpStatus.OK);
    }
}
