import { memo } from 'react';
  import Search from '../../../../shared/components/Search';

const UsersTable = () => {
  return (
    <div>
      <div>
        <Search/>
      </div>
    </div>
  );
};

export default memo(UsersTable);