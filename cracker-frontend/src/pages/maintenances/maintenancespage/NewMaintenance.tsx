import { Button, Modal, Backdrop, Fade, Box, Typography, TextField, MenuItem} from "@mui/material";
import shipService from "../../../services/shipService";
import { useEffect, useState } from "react";
import ShipMaintenance from "../../../interfaces/shipMaintenance";
import Ship from "../../../interfaces/ship";


export default function NewMaintenance(){
    const [open, setOpen] = useState(false);
    const [ships, setShips] = useState<Ship[]>([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newMaintenance, setNewMaintenance] = useState<ShipMaintenance>({
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
        maintenance: {
            maintenanceid: 0,
            date: undefined,
            type: "",
            description: ""
        }
    });

    const typeOptions=[
        {
            option: "Scheduled"
        },
        {
            option: "Routine"
        }
        ,
        {
            option: "Emergency"
        }
    ]

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

    const handleNewShipment = async () => {
        try {
            await shipService.insertMaintenance(newMaintenance);
            handleClose();
        } catch (error) {
            console.error('Error inserting new shipment:', error);
        }
    };

    const handleMaintenanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewMaintenance(prevState => ({
            ...prevState,
            maintenance: {
                ...prevState.maintenance,
                [name]: value
            }
        }));
    };

    const handleShipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewMaintenance(prevState => ({
            ...prevState,
            ship: {
                ...prevState.ship,
                [name]: value
            }
        }));
    };

    return(
    <>
        <Button color='secondary' onClick={handleOpen} className='datagrid-new-button'>New Maintenance</Button>
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
                        New Maintenance
                    </Typography>
                    <TextField
                        select
                        label="Ship"
                        name="shipnr"
                        value={newMaintenance.ship.shipnr}
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
                        type="date"
                        label="Date"
                        name="date"
                        value={newMaintenance.maintenance.date}
                        onChange={handleMaintenanceChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        type="option"
                        label="Type"
                        name="type"
                        select={true}
                        value={newMaintenance.maintenance.type}
                        onChange={handleMaintenanceChange}
                        sx={{ mt: 2 }}
                        >
                        {typeOptions.map((typeOption) => (
                            <MenuItem key={typeOption.option} value={typeOption.option}>
                                {typeOption.option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Description"
                        name="description"
                        value={newMaintenance.maintenance.description}
                        onChange={handleMaintenanceChange}
                        sx={{ mt: 2 }}
                    />
                    <Button color="secondary" onClick={handleNewShipment} sx={{ mt: 2 }}>Add Shipment</Button>
                </Box>
            </Fade>
        </Modal>
    </>)
}
