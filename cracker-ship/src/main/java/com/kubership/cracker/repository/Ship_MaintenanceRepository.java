package com.kubership.cracker.repository;

import com.kubership.cracker.model.Ship_Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Ship_MaintenanceRepository extends JpaRepository<Ship_Maintenance, Integer> {
}
