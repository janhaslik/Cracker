import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Ship from '../../../interfaces/ship';
import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import shipService from '../../../services/shipService';

interface ShipsTableInterface{
    ships: Ship[],
}

export default function ShipsTable(props: ShipsTableInterface){
  const columns: GridColDef[] = [
    { field: 'shipnr', headerName: 'Ship Nr', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 130 },
    {
      field: 'currentvalue',
      headerName: 'Current Value',
      width: 150
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 160,
    },
    {
      headerName: "Delete",
      field: "delete",
      width: 100,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={(e) => handleDeleteClick(e, params.row.shipnr)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

    const getRowId = (ship: Ship) => ship.shipnr.toString();
    const navigate=useNavigate()

    const handleItemChange=(selection: any)=>{
        const selectedShipId=selection[0]
    
        navigate(`/ships/${selectedShipId}`)
      }

      const handleDeleteClick = (e: React.MouseEvent, shipNr: number) => {
        e.stopPropagation();
        shipService.deleteShip(shipNr)
      };
    
    
    return <>
        <DataGrid
                rows={props.ships}
                columns={columns}
                pageSizeOptions={[5,10]}
                getRowId={getRowId}
                onRowSelectionModelChange={handleItemChange}
            />
    </>
}