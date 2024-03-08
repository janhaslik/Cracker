package com.kubership.cracker.controllers;

import com.kubership.cracker.model.CrewMember;
import com.kubership.cracker.model.Ship;
import com.kubership.cracker.services.CrewMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crewmembers")
public class ShipMemberController {

    @Autowired
    private CrewMemberService crewMemberService;

    @GetMapping()
    public ResponseEntity<List<CrewMember>> getCrewMembers(@RequestParam(value = "shipnr", required = true) int shipnr){
        if(shipnr<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        List<CrewMember> crewMembers=crewMemberService.getCrewMembersByShip(shipnr);

        return new ResponseEntity<>(crewMembers, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<CrewMember> insertCrewMember(@RequestBody CrewMember crewMemberBody){
        if(crewMemberBody==null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        CrewMember crewMember=crewMemberService.insertCrewMember(crewMemberBody);

        if(crewMember==null)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(crewMember, HttpStatus.OK);
    }
}
