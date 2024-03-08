package com.kubership.cracker.services;

import com.kubership.cracker.model.Ship;
import com.kubership.cracker.repository.ShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipService {

    @Autowired
    private ShipRepository shipRepository;

    public List<Ship> getShipsByOwner(int owner){
        if(owner<0)return null;

        return shipRepository.findShipsByOwner(owner);
    }

    public Ship getShip(int shipnr){
        if(shipnr<0)return null;
        return shipRepository.findShipByShipnr(shipnr);
    }

    public Ship insertShip(Ship ship){
        if(ship==null)return null;

        Ship shipExists=shipRepository.findShipByShipnr(ship.getShipnr());
        if(shipExists!=null)return null;

        return shipRepository.save(ship);
    }

    public Ship updateShip(Ship ship){
        Ship shipExists=shipRepository.findShipByShipnr(ship.getShipnr());

        if(shipExists==null)return null;

        shipExists.setName(ship.getName());
        shipExists.setType(ship.getType());
        shipExists.setCurrentvalue(ship.getCurrentvalue());
        shipExists.setOwner(ship.getOwner());
        shipExists.setYear(ship.getYear());
        shipExists.setImage(ship.getImage());

        return shipRepository.save(shipExists);
    }
}