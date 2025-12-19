import { memo, type FC } from "react";
import Search from "../../../../shared/components/Search";
import type { PaginationProps } from "antd";
import { Plus, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../shared/components/pageHeader";
import UserTable from "./userTable";

interface Props {
  data: any[];
  page?: number;
  total?: number;
  pageSize?: number;
  onPageChange?: PaginationProps["onChange"];
}

const Users: FC<Props> = ({
  data,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-25 items-center mb-2">
        <PageHeader title="Users" />

        <div className="flex items-center px-6 py-2 rounded-xl bg-white w-[300px] cursor-pointer">
          <div className="w-full">
            <p className="text-helpertext text-[18px] font-medium">Users</p>
            <strong className="text-[24px]">200</strong>
          </div>
          <div className="rounded-2xl bg-[#fff4e6] px-3 py-3">
            <UsersRound size={30} color="#FA8B00" />
          </div>
        </div>

        <div className="flex items-center px-6 py-2 rounded-xl bg-white w-[300px] cursor-pointer">
          <div className="w-full">
            <p className="text-helpertext text-[18px] font-medium">Admins</p>
            <strong className="text-[24px]">25</strong>
          </div>
          <div className="rounded-2xl bg-[#fff4e6] px-3 py-3">
            <UsersRound size={30} color="#FA8B00" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md">
        <div className="w-full px-6 mt-6 flex justify-between gap-10">
          <Search />
          <button
            onClick={() => navigate("add-admin")}
            className="bg-main text-white px-2 py-1 w-[10%] flex justify-center items-center gap-2 rounded-2xl cursor-pointer font-semibold"
          >
            <Plus size={22} />
            Add admin
          </button>
        </div>

        <div className="w-full h-[80%]">
          <UserTable data={data}/>
        </div>
      </div>
    </div>
  );
};

export default memo(Users);
