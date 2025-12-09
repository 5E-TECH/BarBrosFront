import { memo } from 'react';
import PageHeader from '../../../shared/components/pageHeader';

const Users = () => {
  return (
    <div>
      <PageHeader title='Users'/>
      <div>
        <Users/>
      </div>
    </div>
  );
};

export default memo(Users);