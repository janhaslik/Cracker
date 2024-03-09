async function getShips(){
    let res=await (await fetch("http://localhost:9000/api/ships?ownerid=1")).json()
    return res
}

export default {getShips}