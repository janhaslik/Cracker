import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Ship from "../../../interfaces/ship"
import ShipMaintenance from "../../../interfaces/shipMaintenance";
import ShipCrewMember from "../../../interfaces/shipCrewMember";
import ShipShipment from "../../../interfaces/shipShipment";
import shipService from "../../../services/shipService";
import "../../../style/ships.css"

//data tables for the ship
import ShipmentsTable from "../../shipments/ShipmentsTable";
import MaintenancesTable from "../../maintenances/maintenancespage/MaintenancesTable";
import CrewMemberTable from "../../crewmembers/crewmemberspage/CrewMembersTable";

import { formatDate } from "../../../utils/formatDate";

import Divider from "@mui/material/Divider/Divider";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import MaintenancesPage from "../../maintenances/maintenancespage/MaintenancesPage";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

export default function ShipPage(){
    const [ship, setShip]=useState<Ship | undefined>();
    const [shipMaintenances, setShipMaintenances]=useState<ShipMaintenance[] | undefined>()
    const [shipShipments, setShipShipments]=useState<ShipShipment[] | undefined>();
    const [shipCrewMembers, setShipCrewMembers]=useState<ShipCrewMember[] | undefined>();

    const [tab, setTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
        setTab(newTab);
    }

    const shipnr =useParams().shipnr

    useEffect(()=>{
        const fetchData=async ()=>{

            try {
                const shipData = await shipService.getShip(Number(shipnr));
                const shipMaintenancesData = await shipService.getMaintenancesByShipnr(Number(shipnr));
                const shipShipmentsData = await shipService.getShipmentsByShipnr(Number(shipnr));
                const shipCrewMembersData = await shipService.getCrewMembersByShipnr(Number(shipnr));
        
                if (shipData) {
                  setShip(shipData);
                } else {
                  setShip({
                    shipnr: 0,
                    name: "not found",
                    type: "not found",
                    currentvalue: "not found",
                    year: new Date(),
                    owner: 0,
                    image: ""
                  });
                }
        
                if (shipCrewMembersData) {
                  setShipCrewMembers(shipCrewMembersData);
                }
        
                if (shipMaintenancesData) {
                  setShipMaintenances(shipMaintenancesData);
                }
        
                if (shipShipmentsData) {
                  setShipShipments(shipShipmentsData);
                }
              } catch (error) {
                console.error("Error fetching ship data:", error);
              }
            }
        fetchData()
    },[shipnr])
    
    return <>
        <div className="ship">
            <div className="ship-details">
            <img src="https://www.shutterstock.com/image-photo/webinar-banner-aerial-top-view-600nw-1846546738.jpg" className="backdrop"/>
            <div className="ship-details-content">
                <img className="ship-image" width={250} height={305} src={ship?.image=="" ? "https://www.tea-tron.com/antorodriguez/blog/wp-content/uploads/2016/04/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" : "https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}/>
                <div className="ship-details-text">
                    <h2 className="ship-details-text-name">{ship?.name} ({formatDate(ship?.year.toString())})</h2>
                    <p className="ship-details-text-description">Reichtum, Macht und Ruhm. Der Mann, der sich dies alles erkämpft hatte, war Gol D. Roger, der König der Piraten. Als er hingerichtet wurde, waren seine letzten Worte: „Ihr wollt meinen Schatz? Den könnt ihr haben! Sucht ihn doch! Irgendwo habe ich den größten Schatz der Welt versteckt.“</p>
                    <p className="ship-details-text-detail"><strong>Shipnr:</strong> {ship?.shipnr}</p>
                    <p className="ship-details-text-detail"><strong>Current value:</strong> {ship?.currentvalue}</p>
                    <p className="ship-details-text-detail"><strong>Type:</strong> {ship?.type}</p>
                </div>
            </div>
        </div>
        <Divider/>
        <Divider/>
        <div className="ships-tabs">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Shipments" {...a11yProps(0)} />
                    <Tab label="Crew Members" {...a11yProps(1)} />
                    <Tab label="Maintenances" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tab} index={0}>
                 <ShipmentsTable shipments={shipShipments} />
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={1}>
                    <CrewMemberTable crewMembers={shipCrewMembers}/>
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={2}>
                <MaintenancesTable maintenances={shipMaintenances}/>
                </CustomTabPanel>
            </Box>
        </div>
    </div>
    </>
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }