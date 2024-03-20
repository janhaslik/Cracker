import Maintenance from "./maintenance";
import Ship from "./ship";

export default interface shipMaintenance{
    id: number;
    ship: Ship;
    maintenance: Maintenance;
}
