import { useState, useEffect } from 'react';
import shipService from '../../../services/shipService';
import Ship from '../../../interfaces/ship';
import { Input } from '@mui/base';
import "../../../style/ships.css"
import ShipsTable from './ShipsTable';
import NewShip from './NewShip';
import TextField from '@mui/material/TextField';

export default function ShipsPage() {
  const [ships, setShips] = useState<Ship[] | undefined>([]);
  const [filteredShips, setFilteredShips]=useState<Ship[] | undefined>(ships);
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    const getShips = async () => {
      try {
        const shipsData = await shipService.getShips();
        if (shipsData != null) {
          setShips(shipsData);
          setFilteredShips(shipsData)
        }
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    };

    getShips();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const searchTerm=event.target.value;
    setFilterValue(searchTerm)

    if(searchTerm.trim()==''){
      setFilteredShips(ships)
    }else{
      setFilteredShips(ships?.filter(ship=>ship.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }
  }

  return (
    <div style={{ height: 400, width: '100%', minHeight: "80vh"}}>
        <div className="datagrid-search-create">
            <Input className="datagrid-search" value={filterValue} onChange={handleSearchChange} placeholder='Search for ship name...'/>
            <NewShip/>
        </div>
        <ShipsTable ships={filteredShips!}/>
    </div>
  );
}
