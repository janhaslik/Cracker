package com.kubership.cracker.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "crewmember")
public class CrewMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int crewmemberid;
    @ManyToOne
    private Ship ship;
    private String name;
    private String role;
}

