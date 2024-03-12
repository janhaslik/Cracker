package com.kubership.cracker.services;

import com.kubership.cracker.model.CrewMember;
import com.kubership.cracker.model.Ship;
import com.kubership.cracker.model.Ship_CrewMember;
import com.kubership.cracker.repository.CrewMemberRepository;
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
    private Ship_CrewMemberRepository shipCrewMemberRepository;
    public Ship_CrewMember insertCrewMember(Ship_CrewMember crewMember){
        if(crewMember==null)return null;
        Optional<Ship_CrewMember> crewMemberExists=shipCrewMemberRepository.findById(crewMember.getId());

        if(crewMemberExists.isPresent())return null;

        crewMemberRepository.save(crewMember.getCrewmember());

        return shipCrewMemberRepository.save(crewMember);
    }

    public List<CrewMember> insertCrewMembers(List<CrewMember> crewMembers){
        if(crewMembers==null || crewMembers.isEmpty())return null;

        return crewMemberRepository.saveAll(crewMembers);
    }

    public List<Ship_CrewMember> getCrewMembersByShip(int shipnr){
        if(shipnr<0)return null;

        return shipCrewMemberRepository.findShip_CrewMemberByShip_Shipnr(shipnr);
    }

    public CrewMember updateCrewMember(CrewMember crewMember){
        Optional<CrewMember> crewMemberExists=crewMemberRepository.findById(crewMember.getCrewmemberid());

        if(crewMemberExists.isEmpty())return null;

        CrewMember crewMemberUpdated=crewMemberExists.get();
        crewMemberUpdated.setName(crewMember.getName());
        crewMemberUpdated.setRole(crewMember.getRole());

        return crewMemberRepository.save(crewMemberUpdated);
    }

    public boolean deleteCrewMember(int crewMemberId){
        if(crewMemberId<0)return false;

        Optional<CrewMember> crewMemberExists=crewMemberRepository.findById(crewMemberId);
        if(crewMemberExists.isEmpty())return false;

        crewMemberRepository.delete(crewMemberExists.get());
        return true;
    }
}
