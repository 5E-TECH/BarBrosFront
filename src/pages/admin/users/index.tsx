import { memo } from 'react';
import PageHeader from '../../../shared/components/pageHeader';
import UsersTable from "./components"

const Users = () => {
  return (
    <div>
      <PageHeader title='Users'/>
      <div>
        <UsersTable/>
      </div>
    </div>
  );
};

export default memo(Users);