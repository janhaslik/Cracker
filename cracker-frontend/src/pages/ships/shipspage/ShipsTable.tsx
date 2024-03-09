import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Ship from '../../../interfaces/ship';
import { useNavigate } from 'react-router';

interface ShipsTableInterface{
    ships: Ship[],
}

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
    }
  ];

export default function ShipsTable(props: ShipsTableInterface){
    const getRowId = (ship: Ship) => ship.shipnr.toString();
    const navigate=useNavigate()

    const handleItemChange=(selection: any)=>{
        const selectedShipId=selection[0]
    
        navigate(`/ships/${selectedShipId}`)
      }
    
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