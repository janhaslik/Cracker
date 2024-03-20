export default interface Shipment{
    shipmentid: number,
    starttime: Date | undefined,
    endtime: Date | undefined,
    departurelocation: string,
    arrivallocation: string
}