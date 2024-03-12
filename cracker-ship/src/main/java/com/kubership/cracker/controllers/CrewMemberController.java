package com.kubership.cracker.controllers;

import com.kubership.cracker.model.CrewMember;
import com.kubership.cracker.model.Ship_CrewMember;
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

    @GetMapping()
    public ResponseEntity<List<Ship_CrewMember>> getCrewMembers(@RequestParam(value = "shipnr", required = true) int shipnr){
        if(shipnr<0)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        List<Ship_CrewMember> crewMembers=crewMemberService.getCrewMembersByShip(shipnr);

        return new ResponseEntity<>(crewMembers, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Ship_CrewMember> insertCrewMember(@RequestBody Ship_CrewMember crewMemberBody){
        if(crewMemberBody==null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Ship_CrewMember crewMember=crewMemberService.insertCrewMember(crewMemberBody);

        if(crewMember==null)return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(crewMember, HttpStatus.OK);
    }
}
