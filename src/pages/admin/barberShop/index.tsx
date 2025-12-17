import { memo } from 'react';
import PageHeader from '../../../shared/components/pageHeader';
import BarberTable from './components/barberTable';

const BarberShop = () => {
  return (
    <div>
      <PageHeader title='BarberShop'/>
      <div className='mt-6'>
        <BarberTable/>
      </div>
    </div>
  );
};

export default memo(BarberShop);