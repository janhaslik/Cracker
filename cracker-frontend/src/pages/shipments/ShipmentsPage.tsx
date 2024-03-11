import { useState, useEffect } from 'react';
import { Input } from '@mui/base';
import { Button } from '@mui/material';
import Shipment from '../../interfaces/shipment';
import ShipmentsTable from './ShipmentsTable';
import shipService from '../../services/shipService';

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filteredShipments, setFilteredShipments]=useState<Shipment[]>(shipments);
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    const getShipments = async () => {
      try {
        const shipmentsData = await shipService.getShipments();
        if (shipmentsData != null) {
          setShipments(shipmentsData);
          setFilteredShipments(shipmentsData)
        }
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    };

    getShipments();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const searchTerm=event.target.value;
    setFilterValue(searchTerm)

    if(searchTerm.trim()==''){
      setFilteredShipments(shipments)
    }else{
      setFilteredShipments(shipments.filter(shipment=>shipment.shipmentid.toString().includes(searchTerm.toLowerCase())))
    }
  }

  return (
    <div style={{ height: 400, width: '100%', minHeight: "80vh"}}>
        <div className="datagrid-search-create">
            <Input className="datagrid-search" value={filterValue} onChange={handleSearchChange} placeholder='Search for shipment id...'/>
            <Button color='secondary' className='datagrid-new-button'>New Shipment</Button>
        </div>
        <ShipmentsTable shipments={filteredShipments}/>
    </div>
  );
}
