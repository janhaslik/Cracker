import Ship from "./ship";

export default interface Shipment{
    shipmentid: number,
    ship: Ship;
    starttime: Date,
    endtime: Date,
    departurelocation: string,
    destinationlocation: string
}