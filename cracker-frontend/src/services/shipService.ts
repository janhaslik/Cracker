import Ship from "../interfaces/ship"
import ShipCrewMember from "../interfaces/shipCrewMember"
import ShipMaintenance from "../interfaces/shipMaintenance"
import ShipShipment from "../interfaces/shipShipment"

async function getShipments(){
    let res=await (await fetch("http://localhost:9000/api/ships/shipments?ownerid=1")).json()
    return res
}

async function insertShipment(shipment: ShipShipment){
    let res=(await fetch("http://localhost:9000/api/ships/shipments",{
        method: "POST",
        body: JSON.stringify(shipment),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    }))
    return res
} 

async function deleteShipment(shipnr: number){
    let res=await (await fetch(`http://localhost:9000/api/ships/shipments/${shipnr}`, {
        method: "DELETE"
    })).json()
    return res
}

async function insertCrewMember(crewmember: ShipCrewMember){
    let res=(await fetch("http://localhost:9000/api/ships/crewmembers",{
        method: "POST",
        body: JSON.stringify(crewmember),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    }))
    return res
}

async function getCrewMembers(){
    let res=await (await fetch("http://localhost:9000/api/ships/crewmembers?ownerid=1")).json()
    return res
}

async function deleteCrewMember(crewmemberid: number){
    let res=await fetch(`http://localhost:9000/api/ships/crewmembers/${crewmemberid}`, {
        method: "DELETE"
    })
    return res
}

async function insertMaintenance(maintenance: ShipMaintenance){
    let res=(await fetch("http://localhost:9000/api/ships/maintenances",{
        method: "POST",
        body: JSON.stringify(maintenance),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    }))
    return res
} 

async function getMaintenances(){
    let res=await (await fetch("http://localhost:9000/api/ships/maintenances?ownerid=1")).json()
    return res
}

async function deleteMaintenance(maintenanceid: number){
    let res=await fetch(`http://localhost:9000/api/ships/maintenances/${maintenanceid}`, {
        method: "DELETE"
    })
    return res
}

async function getShips(){
    let res=await (await fetch("http://localhost:9000/api/ships?ownerid=1")).json()
    return res
}

async function insertShip(ship: Ship){
    let res=(await fetch("http://localhost:9000/api/ships",{
        method: "POST",
        body: JSON.stringify(ship),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    }))
    return res
}

async function deleteShip(shipnr: number){
    let res=await (await fetch(`http://localhost:9000/api/ships/${shipnr}`, {
        method: "DELETE"
    })).json()
    return res
}

export default {getShips, getShipments, insertShipment, deleteShipment, insertShip, deleteShip,  insertCrewMember, getCrewMembers, deleteCrewMember, insertMaintenance,  getMaintenances, deleteMaintenance}