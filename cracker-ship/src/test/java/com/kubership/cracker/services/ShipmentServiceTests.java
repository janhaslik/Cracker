package com.kubership.cracker.services;

import com.kubership.cracker.model.Ship_Shipment;
import com.kubership.cracker.model.Shipment;
import com.kubership.cracker.repository.ShipmentRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Transactional
public class ShipmentServiceTests {

    @Autowired
    private ShipmentService shipmentService;
    @Test
    void verifyGetShipmentsByOwner(){
        List<Ship_Shipment> shipments=shipmentService.getShipmentsByOwner(1);

        Assertions.assertNotEquals(0, shipments);
    }
}
