package com.kubership.cracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "ships")
@ToString
public class Ship{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shipnr;
    private String name;
    private int owner;
    private String type;
    private String image;
    private String currentvalue;
    private Date year;

    @OneToMany(mappedBy = "ship",cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Ship_Shipment> shipments;

    @OneToMany(mappedBy = "ship",cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Ship_CrewMember> crewmembers;

    @OneToMany(mappedBy = "ship",cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Ship_Maintenance> maintenances;

    @Builder
    public Ship(int shipnr, String name, int owner, String type, String image, String currentvalue, Date year){
        this.shipnr=shipnr;
        this.name=name;
        this.owner=owner;
        this.type=type;
        this.image=image;
        this.currentvalue=currentvalue;
        this.year=year;
        this.shipments=new ArrayList<>();
        this.crewmembers=new ArrayList<>();
        this.maintenances=new ArrayList<>();
    }

    @Builder
    public Ship(){
        this.shipments=new ArrayList<>();
        this.crewmembers=new ArrayList<>();
        this.maintenances=new ArrayList<>();
    }
}
