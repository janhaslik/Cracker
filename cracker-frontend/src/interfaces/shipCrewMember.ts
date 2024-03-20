import CrewMember from "./crewMember";
import Ship from "./ship";

export default interface shipCrewMember{
    id: number;
    crewmember: CrewMember
    ship: Ship
}