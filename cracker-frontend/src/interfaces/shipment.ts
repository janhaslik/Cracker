import Ship from "./ship";

export default interface Shipment{
    shipmentid: number,
    shipnr: Ship;
    starttime: Date,
    endtime: Date,
    departurelocation: string,
    destinationlocation: string
}