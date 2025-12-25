import { memo, useState } from "react";
import { useUsers } from "./service/useUser";
import { Outlet, useOutlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../shared/components/pagination/store/paginationSlice";
import PageHeader from "../../../shared/components/pageHeader";
import { UsersRound } from "lucide-react";
import UserTable from "./components/userTable";
import { useAdmins } from "./service/useAdmin";
import AdminTable from "./components/adminTable";
import TableLoading from "../../../shared/components/loadings/tableLoading";

const Users = () => {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: any) => state.paginationSlice);
  const [selectRole, setSelectRole] = useState<"user" | "admin">("user");
  const [searchTerm, setSearchTerm] = useState("");

  const outlet = useOutlet();
  const showTable = !outlet;

  const { getAllUsers } = useUsers();
  const { getAllAdmins } = useAdmins();

  const { data, isLoading } = getAllUsers({ page, limit, search: searchTerm });
  const dataAdmin = getAllAdmins({ page, limit });

  const admins = dataAdmin?.data?.data?.data;
  const users = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? limit;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    dispatch(setPage(1)); 
  };

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <div>
      {showTable && (
        <div className="flex gap-25 items-center mb-2">
          <PageHeader title="Users" />

          <div
            onClick={() => setSelectRole("user")}
            className="flex items-center px-6 py-2 rounded-xl bg-white w-[300px] hover:shadow-md cursor-pointer"
          >
            <div className="w-full">
              <p className="text-helpertext text-[18px] font-medium">Users</p>
              <strong className="text-[24px]">{users?.length ?? 0}</strong>
            </div>
            <div className="rounded-2xl bg-[#fff4e6] px-3 py-3">
              <UsersRound size={30} color="#FA8B00" />
            </div>
          </div>

          <div
            onClick={() => setSelectRole("admin")}
            className="flex items-center px-6 py-2 rounded-xl bg-white hover:shadow-md w-[300px] cursor-pointer"
          >
            <div className="w-full">
              <p className="text-helpertext text-[18px] font-medium">Admins</p>
              <strong className="text-[24px]">{admins?.length ?? 0}</strong>
            </div>
            <div className="rounded-2xl bg-[#fff4e6] px-3 py-3">
              <UsersRound size={30} color="#FA8B00" />
            </div>
          </div>
        </div>
      )}

      {showTable && selectRole === "user" && (
        <UserTable
          data={users}
          page={page}
          total={total}
          pageSize={pageSize}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
          onSearch={handleSearch}
        />
      )}

      {showTable && selectRole === "admin" && (
        <AdminTable
          data={admins}
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
