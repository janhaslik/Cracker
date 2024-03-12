import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ShipShipment from '../../interfaces/shipShipment';

interface ShipmentsTableInterface{
    shipments: ShipShipment[],
}

const columns: GridColDef[] = [
    { field: 'shipmentid', headerName: 'Shipment ID', width: 100,valueGetter: (params)=>params.row?.shipment.shipmentid },
    { field: 'ship', headerName: 'Ship Nr', width: 150, valueGetter: (params)=>params.row?.ship.shipnr },
    { field: 'starttime', headerName: 'Start Time', width: 130,valueGetter: (params)=>params.row?.shipment.starttime  },
    {
      field: 'endtime',
      headerName: 'End Time',
      width: 150,
      valueGetter: (params)=>params.row?.shipment.endtime
    },
    {
      field: 'departurelocation',
      headerName: 'Departure Location',
      width: 160,
      valueGetter: (params)=>params.row?.shipment.departurelocation
    },
    {
      field: 'arrivallocation',
      headerName: 'Arrival Location',
      width: 160,
      valueGetter: (params)=>params.row?.shipment.arrivallocation
    }
  ];

export default function ShipmentsTable(props: ShipmentsTableInterface){
    const getRowId = (ship: ShipShipment) => ship.shipment.shipmentid.toString();

    console.log(props.shipments)
    return <>
        <DataGrid
                rows={props.shipments}
                columns={columns}
                pageSizeOptions={[5,10]}
                getRowId={getRowId}
            />
    </>
}