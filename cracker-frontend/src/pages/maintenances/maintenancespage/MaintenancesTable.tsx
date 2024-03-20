import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ShipMaintenance from '../../../interfaces/shipMaintenance';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import shipService from '../../../services/shipService';

interface MaintenanceTableInterface{
    maintenances: ShipMaintenance[],
}

export default function MaintenancesTable(props: MaintenanceTableInterface){
    const columns: GridColDef[] = [
        { field: 'maintenanceid', headerName: 'Maintenance ID', width: 100,valueGetter: (params)=>params.row?.maintenance.maintenanceid },
        { field: 'ship', headerName: 'Ship Nr', width: 150, valueGetter: (params)=>params.row?.ship.shipnr },
        { field: 'date', headerName: 'Date', width: 130,valueGetter: (params)=>params.row?.maintenance.date  },
        {
          field: 'type',
          headerName: 'Type',
          width: 160,
          valueGetter: (params)=>params.row?.maintenance.type
        },
        {
          field: 'description',
          headerName: 'Description',
          width: 160,
          valueGetter: (params)=>params.row?.maintenance.description
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

    const getRowId = (maintenance: ShipMaintenance) => maintenance.maintenance.maintenanceid.toString();

    const handleItemChange=(selection: any)=>{
        const selectedShipId=selection[0]
      }

      const handleDeleteClick = (e: React.MouseEvent, maintenanceId: number) => {
        e.stopPropagation();
        shipService.deleteMaintenance(maintenanceId);
      };

    console.log(props.maintenances)
    return <>
        <DataGrid
                rows={props.maintenances}
                columns={columns}
                pageSizeOptions={[5,10]}
                getRowId={getRowId}
                onRowSelectionModelChange={handleItemChange}
            />
    </>
}