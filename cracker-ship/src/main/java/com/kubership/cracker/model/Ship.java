package com.kubership.cracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.AbstractPersistable;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
}
