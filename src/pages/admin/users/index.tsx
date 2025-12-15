import { memo } from "react";
import PageHeader from "../../../shared/components/pageHeader";
import UsersTable from "./components";
import { useUsers } from "./service/useUser";
import { Outlet, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../shared/components/pagination/store/paginationSlice";

const Users = () => {
  const dispatch = useDispatch();

  const { page, limit } = useSelector((state: any) => state.paginationSlice);

  const addUserMatch = useMatch("/user/add-admin");
  const showTable = !addUserMatch;

  const { getAllUsers } = useUsers();
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
          onPageChange={(newPage) => {
            dispatch(setPage(newPage));
          }}
        />
      )}

      <Outlet />
    </div>
  );
};

export default memo(Users);
