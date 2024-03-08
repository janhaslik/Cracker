package com.kubership.cracker.controllers;

import com.kubership.cracker.model.Ship;
import com.kubership.cracker.repository.ShipRepository;
import com.kubership.cracker.services.ShipService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ships")
public class ShipController {

    @Autowired
    private ShipService shipService;

    @GetMapping()
    public ResponseEntity<List<Ship>> getShips(@RequestParam(value = "ownerid", required = true) int ownerNr){
        if(ownerNr<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        List<Ship> ships=shipService.getShipsByOwner(ownerNr);

        return ResponseEntity.ok(ships);
    }

    @GetMapping("/{shipnr}")
    public ResponseEntity<Ship> getShip(@PathVariable("shipnr") int shipnr){
        if(shipnr<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        Ship ship=shipService.getShip(shipnr);
        return new ResponseEntity<>(ship, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Ship> insertShip(@RequestBody Ship shipBody){
        if(shipBody==null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Ship ship=shipService.insertShip(shipBody);

        if(ship==null)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(ship, HttpStatus.OK);
    }

    @PatchMapping()
    public ResponseEntity<Ship> updateShip(@RequestBody Ship shipBody){
        if(shipBody==null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Ship ship=shipService.updateShip(shipBody);

        if(ship==null)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(ship, HttpStatus.OK);
    }
}
