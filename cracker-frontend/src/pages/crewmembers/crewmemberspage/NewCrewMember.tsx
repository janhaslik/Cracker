import { Button, Modal, Backdrop, Fade, Box, Typography, TextField, MenuItem} from "@mui/material";
import shipService from "../../../services/shipService";
import { useEffect, useState } from "react";
import Ship from "../../../interfaces/ship";
import ShipCrewMember from "../../../interfaces/shipCrewMember";


export default function NewCrewMember(){
    const [open, setOpen] = useState(false);
    const [ships, setShips] = useState<Ship[]>([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newCrewMember, setNewCrewMember] = useState<ShipCrewMember>({
        id: 0,
        ship: {
            shipnr: 0,
            name: "",
            owner: 0,
            image: "",
            type: "",
            currentvalue: "",
            year: new Date()
        },
        crewmember: {
            crewmemberid: 0,
            name: "",
            role: "",
        }
    });

    useEffect(() => {
        const getShips = async () => {
            try {
                const shipsData = await shipService.getShips();
                if (shipsData != null) {
                    setShips(shipsData);
                }
            } catch (error) {
                console.error('Error fetching ship data:', error);
            }
        };

        getShips();
    }, []);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column'
    };

    const handleNewCrewMember = async () => {
        try {
            await shipService.insertCrewMember(newCrewMember);
            handleClose();
        } catch (error) {
            console.error('Error inserting new shipment:', error);
        }
    };

    const handleMaintenanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCrewMember(prevState => ({
            ...prevState,
            crewmember: {
                ...prevState.crewmember,
                [name]: value
            }
        }));
    };

    const handleShipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCrewMember(prevState => ({
            ...prevState,
            ship: {
                ...prevState.ship,
                [name]: value
            }
        }));
    };

    return(
    <>
        <Button color='secondary' onClick={handleOpen} className='datagrid-new-button'>New Crew Member</Button>
        <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="spring-modal-title" variant="h6" component="h2">
                        New Crew Member
                    </Typography>                    
                    <TextField
                        label="Name"
                        name="name"
                        value={newCrewMember.crewmember.name}
                        onChange={handleMaintenanceChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        select
                        label="Ship"
                        name="shipnr"
                        value={newCrewMember.ship.shipnr}
                        onChange={handleShipChange}
                        sx={{ mt: 2 }}
                    >
                        {ships.map((ship) => (
                            <MenuItem key={ship.shipnr} value={ship.shipnr}>
                                {ship.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Role"
                        name="role"
                        value={newCrewMember.crewmember.role}
                        onChange={handleMaintenanceChange}
                        sx={{ mt: 2 }}
                    />
                    <Button color="secondary" onClick={handleNewCrewMember} sx={{ mt: 2 }}>Add Crew Member</Button>
                </Box>
            </Fade>
        </Modal>
    </>)
}
