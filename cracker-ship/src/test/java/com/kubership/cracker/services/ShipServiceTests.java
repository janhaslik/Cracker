package com.kubership.cracker.services;

import com.kubership.cracker.model.Ship;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@Transactional
public class ShipServiceTests {

    @MockBean
    private ShipService mockShipService;
    @Test
    void verifyGetShipsByOwner(){
        Ship ship=Ship.builder().owner(1).build();
        Ship ship1=Ship.builder().owner(1).build();

        List<Ship> expectedShips= Arrays.asList(ship,ship1);

        when(mockShipService.getShipsByOwner(1)).thenReturn(expectedShips);

        List<Ship> ships=mockShipService.getShipsByOwner(1);

        Assertions.assertEquals(expectedShips,ships);
    }

    @Test
    void verifyGetShip(){
        Ship expectedShip=Ship.builder().shipnr(9001).build();

        when(mockShipService.getShip(9001)).thenReturn(expectedShip);

        Ship ship=mockShipService.getShip(9001);

        Assertions.assertEquals(expectedShip,ship);
    }

    @Test
    void verifyInsertShip(){
        Ship expectedShip=Ship.builder().owner(1).name("Oro Jackson").build();

        when(mockShipService.insertShip(expectedShip)).thenReturn(expectedShip);
        Ship ship=mockShipService.insertShip(expectedShip);

        Assertions.assertNotNull(ship);
        Assertions.assertEquals(expectedShip,ship);
    }

    @Test
    void verifyInsertShipAlreadyExists(){
        Ship expectedShip=Ship.builder().owner(1).name("Oro Jackson").build();

        when(mockShipService.insertShip(expectedShip)).thenReturn(expectedShip);
        Ship ship=mockShipService.insertShip(expectedShip);

        when(mockShipService.insertShip(expectedShip)).thenReturn(null);
        Ship shipNull=mockShipService.insertShip(expectedShip);

        Assertions.assertNull(shipNull);
    }

    @Test
    void verifyUpdateShip(){
        Ship expectedShip=Ship.builder().owner(1).name("Oro Jackson").build();
        Ship updateShip=Ship.builder().owner(1).name("Ono Jackson").build();

        when(mockShipService.insertShip(expectedShip)).thenReturn(expectedShip);
        Ship insertedShip=mockShipService.insertShip(expectedShip);

        when(mockShipService.updateShip(updateShip)).thenReturn(updateShip);
        mockShipService.updateShip(updateShip);

        Assertions.assertNotEquals(insertedShip, updateShip);
    }
}
