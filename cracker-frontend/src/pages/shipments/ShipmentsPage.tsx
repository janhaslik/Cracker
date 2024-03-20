import { useState, useEffect } from 'react';
import { Input } from '@mui/base';
import { Button } from '@mui/material';
import ShipmentsTable from './ShipmentsTable';
import shipService from '../../services/shipService';
import ShipShipment from '../../interfaces/shipShipment';
import NewShipmentModal from './NewShipment';

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<ShipShipment[]>([]);
  const [filteredShipments, setFilteredShipments]=useState<ShipShipment[]>(shipments);
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    const getShipments = async () => {
      try {
        const shipmentsData = await shipService.getShipments();
          setShipments(shipmentsData);
          setFilteredShipments(shipmentsData)
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
      setFilteredShipments(shipments.filter(shipment=>shipment.shipment.shipmentid.toString().includes(searchTerm.toLowerCase())))
    }
  }

  return (
    <div style={{ height: 400, width: '100%', minHeight: "80vh"}}>
        <div className="datagrid-search-create">
            <Input className="datagrid-search" value={filterValue} onChange={handleSearchChange} placeholder='Search for shipment id...'/>
            <NewShipmentModal/>
        </div>
        <ShipmentsTable shipments={filteredShipments}/>
    </div>
  );
}
