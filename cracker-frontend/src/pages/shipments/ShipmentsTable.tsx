import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Shipment from '../../interfaces/shipment';

interface ShipmentsTableInterface{
    shipments: Shipment[],
}

const columns: GridColDef[] = [
    { field: 'shipmentid', headerName: 'Shipment ID', width: 100 },
    { field: 'shipnr', headerName: 'Ship Nr', width: 150 },
    { field: 'starttime', headerName: 'Start Time', width: 130 },
    {
      field: 'endtime',
      headerName: 'End Time',
      width: 150
    },
    {
      field: 'departurelocation',
      headerName: 'Departure Location',
      width: 160,
    },
    {
      field: 'arrivallocation',
      headerName: 'Arrival Location',
      width: 160,
    }
  ];

export default function ShipmentsTable(props: ShipmentsTableInterface){
    const getRowId = (ship: Shipment) => ship.shipmentid.toString();

    
    return <>
        <DataGrid
                rows={props.shipments}
                columns={columns}
                pageSizeOptions={[5,10]}
                getRowId={getRowId}
            />
    </>
}