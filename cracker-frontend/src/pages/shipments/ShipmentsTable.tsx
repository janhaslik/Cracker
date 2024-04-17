import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ShipShipment from '../../interfaces/shipShipment';
import shipService from '../../services/shipService';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ShipmentsTableInterface{
    shipments?: ShipShipment[],
}

export default function ShipmentsTable(props: ShipmentsTableInterface){
  console.log(props.shipments)
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
    },
    {
      headerName: "Delete",
      field: "delete",
      width: 100,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={(e) => handleDeleteClick(e, params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

    const getRowId = (ship: ShipShipment) => ship.shipment.shipmentid.toString();

    const handleDeleteClick = (e: React.MouseEvent, shipNr: number) => {
      e.stopPropagation();
      shipService.deleteShipment(shipNr)
    };

    return <>
        {props.shipments ? (
        <DataGrid
          rows={props.shipments}
          columns={columns}
          pageSizeOptions={[5, 10]}
          getRowId={getRowId}
        />
      ) : (
        <p>No shipments available.</p>
      )}
    </>
}