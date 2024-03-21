import { Button, Modal, Backdrop, Fade, Box, Typography, TextField, MenuItem} from "@mui/material";
import shipService from "../../services/shipService";
import { useEffect, useState } from "react";
import ShipShipment from "../../interfaces/shipShipment";
import Ship from "../../interfaces/ship";

export default function NewShipmentModal(){
    const [open, setOpen] = useState(false);
    const [ships, setShips] = useState<Ship[]>([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newShipment, setNewShipment] = useState<ShipShipment>({
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
        shipment: {
            shipmentid: 0,
            starttime: new Date(),
            endtime: new Date(),
            departurelocation: "",
            arrivallocation: ""
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

    const handleNewShipment = async () => {
        try {
            await shipService.insertShipment(newShipment);
            handleClose();
        } catch (error) {
            console.error('Error inserting new shipment:', error);
        }
    };

    const handleShipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewShipment(prevState => ({
            ...prevState,
            shipment: {
                ...prevState.shipment,
                [name]: value
            }
        }));
    };

    const handleShipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewShipment(prevState => ({
            ...prevState,
            ship: {
                ...prevState.ship,
                [name]: value
            }
        }));
    };

    return(
    <>
        <Button color='secondary' onClick={handleOpen} className='datagrid-new-button'>New Shipment</Button>
        <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
            TransitionComponent: Fade,
            },
        }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="spring-modal-title" variant="h6" component="h2">
                        New Shipment
                    </Typography>
                    <TextField
                        select
                        label="Ship"
                        name="shipnr"
                        value={newShipment.ship.shipnr}
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
                        label="Start Time"
                        name="starttime"
                        value={newShipment.shipment.starttime}
                        onChange={handleShipmentChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        type="date"
                        label="End Time"
                        name="endtime"
                        value={newShipment.shipment.endtime}
                        onChange={handleShipmentChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Departure Location"
                        name="departurelocation"
                        value={newShipment.shipment.departurelocation}
                        onChange={handleShipmentChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Arrival Location"
                        name="arrivallocation"
                        value={newShipment.shipment.arrivallocation}
                        onChange={handleShipmentChange}
                        sx={{ mt: 2 }}
                    />
                    <Button color="secondary" onClick={handleNewShipment} sx={{ mt: 2 }}>Add Shipment</Button>
                </Box>
            </Fade>
        </Modal>
    </>)
}
