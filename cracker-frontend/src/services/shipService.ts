import Ship from "../interfaces/ship"

async function getShips(){
    let res=await (await fetch("http://localhost:9000/api/ships?ownerid=1")).json()
    return res
}

async function getShipments(){
    let res=await (await fetch("http://localhost:9000/api/shipments?ownerid=1")).json()
    return res
}

async function insertShip(ship: Ship){
    let res=(await fetch("http://localhost:9000/api/ships?ownerid=1",{
        method: "POST",
        body: JSON.stringify(ship),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    }))
    return res
}
export default {getShips, getShipments, insertShip}