import { useState, useEffect } from 'react';
import { Input } from '@mui/base';
import { Button } from '@mui/material';
import shipService from '../../../services/shipService';
import ShipMaintenance from '../../../interfaces/shipMaintenance';
import MaintenancesTable from './MaintenancesTable';
import NewMaintenance from './NewMaintenance';

export default function MaintenancesPage() {
  const [maintenances, setMaintenances] = useState<ShipMaintenance[]>([]);
  const [filteredMaintenances, setFilteredMaintenances]=useState<ShipMaintenance[]>(maintenances);
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    const getMaintenances = async () => {
      try {
        const maintenancesData = await shipService.getMaintenances();
        if (maintenancesData != null) {
          setMaintenances(maintenancesData);
          setFilteredMaintenances(maintenancesData)
        }
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    };

    getMaintenances();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const searchTerm=event.target.value;
    setFilterValue(searchTerm)

    if(searchTerm.trim()==''){
      setFilteredMaintenances(maintenances)
    }else{
      setFilteredMaintenances(maintenances.filter(maintenance=>maintenance.maintenance.maintenanceid.toString().includes(searchTerm.toLowerCase())))
    }
  }

  return (
    <div style={{ height: 400, width: '100%', minHeight: "80vh"}}>
        <div className="datagrid-search-create">
            <Input className="datagrid-search" value={filterValue} onChange={handleSearchChange} placeholder='Search for id...'/>
            <NewMaintenance/>
        </div>
        <MaintenancesTable maintenances={filteredMaintenances}/>
    </div>
  );
}
