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
@Table(name = "maintenances")
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maintenanceid;
    private Date date;
    private String type;
    private String description;

    @OneToMany(mappedBy = "maintenance",cascade = CascadeType.PERSIST, orphanRemoval = true)
    @JsonIgnore
    private List<Ship_Maintenance> maintenances;

    @Builder
    public Maintenance(int maintenanceid, Date date, String type, String description) {
        this.maintenanceid=maintenanceid;
        this.date=date;
        this.type=type;
        this.description=description;
        this.maintenances = new ArrayList<>();
    }
    @Builder
    public Maintenance(){
        this.maintenances=new ArrayList<>();
    }
}
