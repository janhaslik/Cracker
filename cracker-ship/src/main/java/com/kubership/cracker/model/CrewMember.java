package com.kubership.cracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "crewmembers")
public class CrewMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int crewmemberid;
    private String name;
    private String role;

    @OneToMany(mappedBy = "crewmember",cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Ship_CrewMember> crewMembers;

    @Builder
    public CrewMember(int crewmemberid, String name, String role){
        this.crewmemberid=crewmemberid;
        this.name=name;
        this.role=role;
        this.crewMembers=new ArrayList<>();
    }

    @Builder
    public CrewMember(){
        this.crewMembers=new ArrayList<>();
    }
}

