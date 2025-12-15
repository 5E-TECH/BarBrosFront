import { memo } from "react";
import PageHeader from "../../../shared/components/pageHeader";
import UsersTable from "./components";
import { useUsers } from "./service/useUser";
import { Outlet, useMatch } from "react-router-dom";

const Users = () => {
  const addUserMatch = useMatch("/user/add-admin");
  const showTable = !addUserMatch; 

  const { getAllUsers } = useUsers();
  const page = 1;
  const limit = 7;

  const { data } = getAllUsers({ page, limit });
  const users = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? limit;

  return (
    <div>
      {showTable && <PageHeader title="Users" />}
      {showTable && (
        <UsersTable
          data={users}
          page={page}
          total={total}
          pageSize={pageSize}
          onPageChange={() => {}}
        />
      )}
      <Outlet /> 
    </div>
  );
};

export default memo(Users);
