import { memo, useEffect, useState } from "react";
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
import type { RootState } from "../../../app/store";

const Users = () => {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: any) => state.paginationSlice);
  const [selectRole, setSelectRole] = useState<"user" | "admin">("user");

  const outlet = useOutlet();
  const showTable = !outlet;

  const { getAllUsers } = useUsers();
  const { getAllAdmins } = useAdmins();
  
  // Redux'dan search olish
  const search = useSelector((state: RootState) => state.search.userSearch);
  const role = useSelector((state: RootState) => state.roleSlice.role);

  const params = { page, limit, search };

  const { data, isLoading } = getAllUsers(params);
  const dataAdmin = getAllAdmins({ page, limit }, role !== "admin");

  const admins = dataAdmin?.data?.data?.data;
  const users = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? limit;

  // Faqat role o'zgarganda page'ni 1 ga qaytarish
  useEffect(() => {
    dispatch(setPage(1));
  }, [selectRole, dispatch]);

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <div>
      {showTable && (
        <div
          className="flex flex-col mb-12 gap-3
                     sm:flex-row sm:items-center sm:gap-20"
        >
          <PageHeader title="Users" />

          <div
            onClick={() => setSelectRole("user")}
            className={`flex items-center px-4 py-3 rounded-xl bg-white
                       w-full sm:w-[300px]
                       hover:shadow-md cursor-pointer
                       dark:bg-[#191a1f]
                       transition-all duration-200
                       ${selectRole === "user" ? "ring-2 ring-[#FA8B00] shadow-md" : ""}`}
          >
            <div className="w-full dark:text-white">
              <p className="text-helpertext text-[16px] sm:text-[18px] font-medium">
                Users
              </p>
              <strong className="text-[20px] sm:text-[24px]">
                {users?.length ?? 0}
              </strong>
            </div>
            <div className="rounded-2xl bg-[#fff4e6] dark:bg-[#1f222b] px-3 py-3 sm:px-4 sm:py-4">
              <UsersRound size={30} color="#FA8B00" />
            </div>
          </div>

          {role === "supperadmin" && (
            <div
              onClick={() => setSelectRole("admin")}
              className={`flex items-center px-4 py-3 rounded-xl bg-white
                       w-full sm:w-[300px]
                       hover:shadow-md cursor-pointer
                       dark:bg-[#191a1f]
                       transition-all duration-200
                       ${selectRole === "admin" ? "ring-2 ring-[#FA8B00] shadow-md" : ""}`}
            >
              <div className="w-full dark:text-white">
                <p className="text-helpertext text-[16px] sm:text-[18px] font-medium">
                  Admins
                </p>
                <strong className="text-[20px] sm:text-[24px]">
                  {admins?.length ?? 0}
                </strong>
              </div>
              <div className="rounded-2xl bg-[#fff4e6] dark:bg-[#1f222b] px-3 py-3 sm:px-4 sm:py-4">
                <UsersRound size={30} color="#FA8B00" />
              </div>
            </div>
          )}
        </div>
      )}

      {showTable && selectRole === "user" && (
        <UserTable
          data={users}
          page={page}
          total={total}
          pageSize={pageSize}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
        />
      )}

      {showTable && selectRole === "admin" && <AdminTable data={admins} />}

      <Outlet />
    </div>
  );
};

export default memo(Users);