import { memo } from 'react';
import PageHeader from '../../../shared/components/pageHeader';
import BookingTable from './components/bookingTable';

const Index = () => {
  return (
    <div>
      <PageHeader title='Booking'/>
      <BookingTable />
    </div>
  );
};

export default memo(Index);