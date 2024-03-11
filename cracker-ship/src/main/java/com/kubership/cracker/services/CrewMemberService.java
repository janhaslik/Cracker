package com.kubership.cracker.services;

import com.kubership.cracker.model.CrewMember;
import com.kubership.cracker.model.Ship;
import com.kubership.cracker.repository.CrewMemberRepository;
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
    public CrewMember insertCrewMember(CrewMember crewMember){
        if(crewMember==null)return null;
        Optional<CrewMember> crewMemberExists=crewMemberRepository.findById(crewMember.getCrewmemberid());

        if(crewMemberExists.isPresent())return null;

        return crewMemberRepository.save(crewMember);
    }

    public List<CrewMember> insertCrewMembers(List<CrewMember> crewMembers){
        if(crewMembers==null || crewMembers.isEmpty())return null;

        return crewMemberRepository.saveAll(crewMembers);
    }

    public List<CrewMember> getCrewMembersByShip(int shipnr){
        return crewMemberRepository.getCrewMembersByShipShipnr(shipnr);
    }

    public CrewMember updateCrewMember(CrewMember crewMember){
        Optional<CrewMember> crewMemberExists=crewMemberRepository.findById(crewMember.getCrewmemberid());

        if(crewMemberExists.isEmpty())return null;

        CrewMember crewMemberUpdated=crewMemberExists.get();
        crewMemberUpdated.setName(crewMember.getName());
        crewMemberUpdated.setShip(crewMember.getShip());
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
