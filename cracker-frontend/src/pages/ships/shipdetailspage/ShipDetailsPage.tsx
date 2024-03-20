import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Ship from "../../../interfaces/ship"
import ShipMaintenance from "../../../interfaces/shipMaintenance";
import ShipCrewMember from "../../../interfaces/shipCrewMember";
import ShipShipment from "../../../interfaces/shipShipment";
import shipService from "../../../services/shipService";
import { Tab } from "@mui/material";

export default function ShipPage(){
    const [ship, setShip]=useState<Ship>();
    const [shipMaintenances, setShipMaintenances]=useState<ShipMaintenance>()
    const [shipShipments, setShipShipments]=useState<ShipShipment>();
    const [shipCrewMembers, setShipCrewMembers]=useState<ShipCrewMember>();

    useEffect(()=>{
        const fetchData=async ()=>{
            const shipnr =useParams().shipNr

            /*const shipData=shipService.getShip(shipnr);
            const shipMaintenancesData=shipService.getMaintenancesByShipnr(shipnr)
            const shipShipmentsData=shipService.getShipmentsByShipnr(shipnr)
            const shipCrewMembersData=shipService.getCrewMembersByShipnr(shipnr)

            setShip(shipData)
            setShipMaintenances(shipMaintenancesData)
            setShipShipments(shipShipmentsData)
            setShipCrewMembers(shipCrewMembersData)*/
        }
        fetchData()
    },[])
    
    return <></>
}