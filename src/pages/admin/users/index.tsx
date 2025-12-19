import { memo } from "react";
import UsersTable from "./components";
import { useUsers } from "./service/useUser";
import { Outlet, useOutlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../shared/components/pagination/store/paginationSlice";
import { useAdmins } from "./service/useAdmin";

const Users = () => {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: any) => state.paginationSlice);

  const outlet = useOutlet();
  const showTable = !outlet;

  const { getAllUsers } = useUsers();
  const { getAllAdmins } = useAdmins();
  const { dataAdmin } = getAllAdmins({ page, limit });
  const { data } = getAllUsers({ page, limit });

  const users = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? limit;

  return (
    <div>
      {showTable && (
        <UsersTable
          data={users}
          page={page}
          total={total}
          pageSize={pageSize}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
        />
      )}

      <Outlet />
    </div>
  );
};

export default memo(Users);
