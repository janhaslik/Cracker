import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import shipService from '../../../services/shipService';
import shipCrewMember from '../../../interfaces/shipCrewMember';

interface CrewMembeTableInterface{
    crewMembers?: shipCrewMember[],
}

export default function CrewMemberTable(props: CrewMembeTableInterface){
    const columns: GridColDef[] = [
        { field: 'crewmemberid', headerName: 'Crew Member ID', width: 100,valueGetter: (params)=>params.row?.crewmember.crewmemberid },
        { field: 'name', headerName: 'Name', width: 150, valueGetter: (params)=>params.row?.crewmember.name },
        { field: 'role', headerName: 'Role', width: 130,valueGetter: (params)=>params.row?.crewmember.role  },
        {field: "Ship", headerName: "Ship", valueGetter: (params)=>params.row?.ship.shipnr},
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

    const getRowId = (crewMember: shipCrewMember) => crewMember.id.toString();

    const handleItemChange=(selection: any)=>{
        const selectedShipId=selection[0]
      }

      const handleDeleteClick = (e: React.MouseEvent, crewMemberId: number) => {
        e.stopPropagation();
        shipService.deleteCrewMember(crewMemberId)
      };

    console.log(props.crewMembers)
    return <>
            {props.crewMembers ? (
              <DataGrid
                rows={props.crewMembers}
                columns={columns}
                pageSizeOptions={[5,10]}
                getRowId={getRowId}
                onRowSelectionModelChange={handleItemChange}
            />
      ) : (
        <p>No crew members available.</p>
      )}
    </>
}