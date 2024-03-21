package com.kubership.cracker.controllers;

import com.kubership.cracker.model.Ship;
import com.kubership.cracker.model.Ship_Shipment;
import com.kubership.cracker.model.Shipment;
import com.kubership.cracker.services.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ships/shipments")
@CrossOrigin("http://localhost:5173")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @GetMapping
    public ResponseEntity<List<Ship_Shipment>> getShipments(@RequestParam(required = false) Integer ownerid,
                                                            @RequestParam(required = false) Integer shipnr) {
        if (ownerid != null) {
            if (ownerid < 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            List<Ship_Shipment> shipmentsByOwner = shipmentService.getShipmentsByOwner(ownerid);
            if (shipmentsByOwner == null || shipmentsByOwner.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(shipmentsByOwner, HttpStatus.OK);
        } else if (shipnr != null) {
            if (shipnr < 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            List<Ship_Shipment> shipmentsByShipnr = shipmentService.getShipmentsByShipnr(shipnr);
            if (shipmentsByShipnr == null || shipmentsByShipnr.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(shipmentsByShipnr, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<Ship_Shipment> insertShipment(@RequestBody Ship_Shipment shipShipment) {
        if (shipShipment == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Ship_Shipment savedShipShipment = shipmentService.insertShipment(shipShipment);
        if (savedShipShipment == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(savedShipShipment, HttpStatus.OK);
    }

    @PatchMapping()
    public ResponseEntity<Ship_Shipment> updateShipment(@RequestBody Ship_Shipment shipShipmentBody){
        if(shipShipmentBody==null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Ship_Shipment updatedShipShipment=shipmentService.updateShipment(shipShipmentBody);

        if(updatedShipShipment==null)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(updatedShipShipment, HttpStatus.OK);
    }

    @DeleteMapping("/{shipmentid}")
    public ResponseEntity deleteShipment(@PathVariable("shipmentid") int shipmentid){
        if(shipmentid<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        boolean success= shipmentService.deleteShipment(shipmentid);
        if(!success)return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
