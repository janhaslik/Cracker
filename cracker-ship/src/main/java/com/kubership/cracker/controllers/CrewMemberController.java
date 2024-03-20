package com.kubership.cracker.controllers;

import com.kubership.cracker.model.CrewMember;
import com.kubership.cracker.model.Ship;
import com.kubership.cracker.model.Ship_CrewMember;
import com.kubership.cracker.model.Ship_Shipment;
import com.kubership.cracker.services.CrewMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ships/crewmembers")
@CrossOrigin("http://localhost:5173")
public class CrewMemberController {

    @Autowired
    private CrewMemberService crewMemberService;

    @GetMapping
    public ResponseEntity<List<Ship_CrewMember>> getCrewMembers(@RequestParam(name = "ownerid",required = false) Integer ownerid,
                                                            @RequestParam(name="shipnr",required = false) Integer shipnr) {
        if (ownerid != null) {
            if (ownerid < 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            List<Ship_CrewMember> shipmentsByOwner = crewMemberService.getCrewMembersByOwnerid(ownerid);
            if (shipmentsByOwner == null || shipmentsByOwner.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(shipmentsByOwner, HttpStatus.OK);
        } else if (shipnr != null) {
            if (shipnr < 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            List<Ship_CrewMember> shipmentsByShipnr = crewMemberService.getCrewMembersByShipnr(shipnr);
            if (shipmentsByShipnr == null || shipmentsByShipnr.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(shipmentsByShipnr, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<Ship_CrewMember> insertCrewMember(@RequestBody Ship_CrewMember crewMemberBody){
        if(crewMemberBody==null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Ship_CrewMember crewMember=crewMemberService.insertCrewMember(crewMemberBody);

        if(crewMember==null)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(crewMember, HttpStatus.OK);
    }

    @DeleteMapping("/{crewmemberid}")
    public ResponseEntity<Ship> deleteCrewMember(@PathVariable("crewmemberid") int crewmemberid){
        if(crewmemberid<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        boolean success= crewMemberService.deleteCrewMember(crewmemberid);
        if(!success)return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
