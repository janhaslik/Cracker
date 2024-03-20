package com.kubership.cracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shipmentid;
    private Date starttime;
    private Date endtime;
    private String departurelocation;
    private String arrivallocation;

    @OneToMany(mappedBy = "shipment",cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Ship_Shipment> shipments;

    @Builder
    public Shipment(int shipmentid, Date starttime, Date endtime, String departurelocation, String arrivallocation){
        this.shipmentid=shipmentid;
        this.starttime=starttime;
        this.endtime=endtime;
        this.departurelocation=departurelocation;
        this.arrivallocation=arrivallocation;
        this.shipments=new ArrayList<>();
    }

    @Builder
    public Shipment(){
        this.shipments=new ArrayList<>();
    }
}
