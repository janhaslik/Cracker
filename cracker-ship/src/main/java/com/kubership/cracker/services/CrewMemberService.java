package com.kubership.cracker.services;

import com.kubership.cracker.model.*;
import com.kubership.cracker.repository.CrewMemberRepository;
import com.kubership.cracker.repository.ShipRepository;
import com.kubership.cracker.repository.Ship_CrewMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CrewMemberService {

    @Autowired
    private CrewMemberRepository crewMemberRepository;
    @Autowired
    private Ship_CrewMemberRepository ship_crewMemberRepository;
    @Autowired
    private ShipRepository shipRepository;
    
    public Ship_CrewMember insertCrewMember(Ship_CrewMember shipCrewMember) {
        if (shipCrewMember == null) return null;

        CrewMember crewMember = shipCrewMember.getCrewmember();
        Ship ship = shipRepository.findShipByShipnr(shipCrewMember.getShip().getShipnr());

        if (crewMember == null || ship == null) return null;

        Optional<CrewMember> existingCrewMember= crewMemberRepository.findById(crewMember.getCrewmemberid());
        if (existingCrewMember.isPresent()) return null;

        crewMember = crewMemberRepository.save(crewMember);

        shipCrewMember.setCrewmember(crewMember);
        shipCrewMember.setShip(ship);

        return ship_crewMemberRepository.save(shipCrewMember);
    }

    public List<CrewMember> insertCrewMembers(List<CrewMember> crewMembers){
        if(crewMembers==null || crewMembers.isEmpty())return null;

        return crewMemberRepository.saveAll(crewMembers);
    }

    public List<Ship_CrewMember> getCrewMembersByShipnr(int shipnr){
        if(shipnr<0)return null;

        return ship_crewMemberRepository.findShip_CrewMemberByShip_Shipnr(shipnr);
    }

    public List<Ship_CrewMember> getCrewMembersByOwnerid(int ownerid){
        if(ownerid<0)return null;

        return ship_crewMemberRepository.findShip_CrewMemberByShip_Owner(ownerid);
    }

    public Ship_CrewMember updateCrewMember(Ship_CrewMember shipCrewMember){
        Optional<Ship_CrewMember> crewMemberOptional = ship_crewMemberRepository.findById(shipCrewMember.getId());

        if (crewMemberOptional.isEmpty()) {
            return null;
        }

        Ship_CrewMember existingCrewMember = crewMemberOptional.get();
        existingCrewMember.setCrewmember(shipCrewMember.getCrewmember());
        existingCrewMember.setShip(shipCrewMember.getShip());

        return ship_crewMemberRepository.save(existingCrewMember);
    }
    public boolean deleteCrewMember(int crewmemberid) {
        if (crewmemberid < 0) return false;

        Optional<Ship_CrewMember> savedShipCrewMember = ship_crewMemberRepository.findById(crewmemberid);

        if (savedShipCrewMember.isEmpty()) return false;

        Ship_CrewMember crewMember = savedShipCrewMember.get();
        crewMember.getShip().getCrewmembers().remove(crewMember);
        crewMember.setShip(null);

        crewMemberRepository.delete(crewMember.getCrewmember());

        ship_crewMemberRepository.delete(crewMember);

        return true;
    }

}
