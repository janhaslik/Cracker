import { Button, Modal, Backdrop, Fade, Box, Typography, TextField, MenuItem } from "@mui/material";
import shipService from "../../../services/shipService";
import { useState } from "react";
import Ship from "../../../interfaces/ship";

export default function NewShipModal(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newShip, setNewShip] = useState<Ship>({
        shipnr: 0,
        name: "",
        owner: 1,
        image: "",
        type: "",
        currentvalue: "",
        year: new Date(),
      });

    const typeOptions=[
        {
            option: "Passenger"
        },
        {
            option: "Cargo"
        }
    ]

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

    const handleNewShip=()=>{
        try {
            const insertShip=async() =>{
                if(newShip){
                    await shipService.insertShip(newShip);
                    handleClose()
                }
            }
            insertShip()
            
          } catch (error) {
            console.error('Error inserting new ship :', error);
          }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
    
        if (type === 'file') {
          const fileName = e.target.files?.[0].name || '';
          setNewShip((prevShip) => ({
            ...prevShip,
            [name]: fileName,
          }));
        } else {
          setNewShip((prevShip) => ({
            ...prevShip,
            [name]: value,
          }));
        }
      };

    return(
    <>
        <Button color='secondary' onClick={handleOpen} className='datagrid-new-button'>New Ship</Button>
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
                        New Ship
                    </Typography>
                        <TextField
                        label="Name"
                        name="name"
                        value={newShip.name}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                        />
                        <TextField
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                        />
                        <TextField
                        type="option"
                        label="Type"
                        name="type"
                        select={true}
                        value={newShip.type}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                        >
                        {typeOptions.map((typeOption) => (
                            <MenuItem key={typeOption.option} value={typeOption.option}>
                                {typeOption.option}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                        label="Current Value"
                        name="currentvalue"
                        value={newShip.currentvalue}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                        />
                        <TextField
                        type="date"
                        label="Year"
                        name="year"
                        value={newShip.year}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                        />
                     <Button color="secondary" onClick={handleNewShip} sx={{ mt: 2 }}>Add Ship</Button>
                </Box>
            </Fade>
        </Modal>
    </>)
}