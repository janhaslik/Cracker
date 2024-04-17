import Ship from "../interfaces/ship"
import ShipCrewMember from "../interfaces/shipCrewMember"
import ShipMaintenance from "../interfaces/shipMaintenance"
import ShipShipment from "../interfaces/shipShipment"

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

async function getMaintenances(){
    const res=await (await fetch("http://localhost:9000/api/ships/maintenances?ownerid=1")).json()
    console.log(res)
}

async function getShipments(): Promise<ShipShipment[] | undefined> {
    try {
        const res = await fetch("http://localhost:9000/api/ships/shipments?ownerid=1");
        if (!res.ok) {
            return undefined;
        }
        const data = await res.json();
        return data as ShipShipment[];
    } catch (error) {
        console.error('Error fetching shipments:', error);
        return undefined;
    }
}

async function getShipmentsByShipnr(shipnr: number): Promise<ShipShipment[] | undefined> {
    try {
        const res = await fetch(`http://localhost:9000/api/ships/shipments?shipnr=${shipnr}`);
        if (!res.ok) {
            return undefined;
        }
        const data = await res.json();
        return data as ShipShipment[];
    } catch (error) {
        console.error('Error fetching shipments by shipnr:', error);
        return undefined;
    }
}

async function insertShipment(shipment: ShipShipment): Promise<any> {
    try {
        const res = await fetch("http://localhost:9000/api/ships/shipments", {
            method: "POST",
            body: JSON.stringify(shipment),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return res;
    } catch (error) {
        console.error('Error inserting shipment:', error);
        return undefined;
    }
}

async function deleteShipment(shipnr: number): Promise<any> {
    try {
        const res = await fetch(`http://localhost:9000/api/ships/shipments/${shipnr}`, {
            method: "DELETE"
        });
        return res;
    } catch (error) {
        console.error('Error deleting shipment:', error);
        return undefined;
    }
}

async function insertCrewMember(crewmember: ShipCrewMember): Promise<any> {
    try {
        const res = await fetch("http://localhost:9000/api/ships/crewmembers", {
            method: "POST",
            body: JSON.stringify(crewmember),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return res;
    } catch (error) {
        console.error('Error inserting crew member:', error);
        return undefined;
    }
}

async function getCrewMembersByShipnr(shipnr: number): Promise<ShipCrewMember[] | undefined> {
    try {
        const res = await fetch(`http://localhost:9000/api/ships/crewmembers?ownerid=1&shipnr=${shipnr}`);
        if (!res.ok) {
            return undefined;
        }
        const crewMembersData = await res.json();
        return crewMembersData;
    } catch (error) {
        console.error('Error fetching crew members by shipnr:', error);
        return undefined;
    }
}

async function insertMaintenance(maintenance: ShipMaintenance): Promise<any> {
    try {
        const res = await fetch("http://localhost:9000/api/ships/maintenances", {
            method: "POST",
            body: JSON.stringify(maintenance),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return res;
    } catch (error) {
        console.error('Error inserting maintenance:', error);
        return undefined;
    }
}

async function getMaintenancesByShipnr(shipnr: number): Promise<ShipMaintenance[] | undefined> {
    try {
        const res = await fetch(`http://localhost:9000/api/ships/maintenances?shipnr=${shipnr}`);
        if (!res.ok) {
            return undefined;
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching maintenances by shipnr:', error);
        return undefined;
    }
}

async function deleteMaintenance(maintenanceid: number): Promise<any> {
    try {
        const res = await fetch(`http://localhost:9000/api/ships/maintenances/${maintenanceid}`, {
            method: "DELETE"
        });
        return res;
    } catch (error) {
        console.error('Error deleting maintenance:', error);
        return undefined;
    }
}

async function getShips(): Promise<Ship[] | undefined> {
    try {
        const res = await fetch("http://localhost:9000/api/ships?ownerid=1");
        if (!res.ok) {
            return undefined;
        }
        const data = await res.json();
        return data as Ship[];
    } catch (error) {
        console.error('Error fetching ships:', error);
        return undefined;
    }
}

async function getShip(shipnr: number): Promise<Ship | undefined> {
    try {
        const res = await fetch(`http://localhost:9000/api/ships/${shipnr}`);
        if (!res.ok) {
            return undefined;
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching ship:', error);
        return undefined;
    }
}

async function insertShip(ship: Ship): Promise<any> {
    try {
        const res = await fetch("http://localhost:9000/api/ships", {
            method: "POST",
            body: JSON.stringify(ship),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return res;
    } catch (error) {
        console.error('Error inserting ship:', error);
        return undefined;
    }
}

async function deleteShip(shipnr: number): Promise<any> {
    try {
        const res = await fetch(`http://localhost:9000/api/ships/${shipnr}`, {
            method: "DELETE"
        });
        return res;
    } catch (error) {
        console.error('Error deleting ship:', error);
        return undefined;
    }
}

export default {getShips, getShip, getShipments,getShipmentsByShipnr, insertShipment, deleteShipment, insertShip, deleteShip,  insertCrewMember, getCrewMembers, getCrewMembersByShipnr, deleteCrewMember, insertMaintenance,  getMaintenances, getMaintenancesByShipnr , deleteMaintenance}

