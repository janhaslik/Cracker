import { useState, useEffect } from 'react';
import { Input } from '@mui/base';
import shipService from '../../../services/shipService';
import NewCrewMember from './NewCrewMember';
import CrewMemberTable from './CrewMembersTable';
import shipCrewMember from '../../../interfaces/shipCrewMember';

export default function CrewMembersPage() {
  const [crewMembers, setCrewMembers] = useState<shipCrewMember[]>([]);
  const [filteredCrewMembers, setFilteredCrewMembers]=useState<shipCrewMember[]>(crewMembers);
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    const getCrewMembers = async () => {
      try {
        const crewMembersData = await shipService.getCrewMembers();
        if (crewMembersData != null) {
          setCrewMembers(crewMembersData);
          setFilteredCrewMembers(crewMembersData)
        }
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    };

    getCrewMembers();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const searchTerm=event.target.value;
    setFilterValue(searchTerm)

    if(searchTerm.trim()==''){
      setFilteredCrewMembers(crewMembers)
    }else{
      setFilteredCrewMembers(crewMembers.filter(crewMember=>crewMember.crewmember.crewmemberid.toString().includes(searchTerm.toLowerCase())))
    }
  }

  return (
    <div style={{ height: 400, width: '100%', minHeight: "80vh"}}>
        <div className="datagrid-search-create">
            <Input className="datagrid-search" value={filterValue} onChange={handleSearchChange} placeholder='Search for id...'/>
            <NewCrewMember/>
        </div>
        <CrewMemberTable crewMembers={filteredCrewMembers}/>
    </div>
  );
}
