import { memo, type FC } from "react";
import { Trash2 } from "lucide-react";
import { Switch, notification } from "antd";
import avatar from "../../../../shared/assets/Avatar.png";
import { useBarberShop } from "../service/useBarberShop";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../shared/components/pageHeader";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import CustomPagination from "../../../../shared/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../shared/components/pagination/store/paginationSlice";
import type { RootState } from "../../../../app/store";
import Search from "../../../../shared/components/Search";

const BarberShopTable: FC = () => {
  const { getBarbershops, deleteBarberShop, updateStatusBarbershop } =
    useBarberShop();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const { page, limit } = useSelector((state: RootState) => state.paginationSlice);

  const params = { page, limit };

  const { data, isLoading, refetch } = getBarbershops(params);

  const items = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? limit;

  const handleToggle = (item: any) => {
    const newStatus = item.status === "active" ? "inactive" : "active";

    updateStatusBarbershop.mutate(
      { id: item.id, status: newStatus },
      {
        onSuccess: () => {
          api.success({
            message: "Status updated",
            description: `${item.name} is now ${newStatus}`,
          });
          refetch();
        },
        onError: () => {
          api.error({
            message: "Error",
            description: "Failed to update status",
          });
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteBarberShop.mutate(
      { id },
      {
        onSuccess: () => {
          api.success({
            message: "Success",
            description: "Barbershop deleted",
          });
          refetch();
        },
        onError: () => {
          api.error({
            message: "Error",
            description: "Delete failed",
          });
        },
      }
    );
  };

  if (isLoading) return <TableLoading />;

  return (
    <div>
      <PageHeader title="BarberShop" />
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md mt-12 mb-10 dark:bg-[#191a1f]">
        {contextHolder}

        <div className="w-[97%] mt-6 px-3 md:px-0">
          <Search/>
        </div>

        <div className="hidden md:block w-full overflow-x-auto">
          <table className="mt-[31px] mb-20 w-full">
            <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#1f222b]">
              <tr>
                <th className="pl-12 pb-3 text-left">BarberShop Name</th>
                <th className="pb-3 text-left">Address</th>
                <th className="pb-3 text-left">Phone number</th>
                <th className="pb-3 text-left">Date of registration</th>
                <th className="pb-3 text-left">Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-helpertext">
                    No barbershops found
                  </td>
                </tr>
              ) : (
                items.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`barbershop-detail/${item?.id}`)}
                    className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#1f222b]"
                  >
                    <td className="pl-12 flex items-center gap-4 py-3">
                      <img src={avatar} className="w-10 h-10" />
                      <div>
                        <p className="text-maintext">{item?.name}</p>
                        <p className="text-helpertext">{item?.email}</p>
                      </div>
                    </td>
                    <td className="text-helpertext">{item?.location}</td>
                    <td className="text-maintext">{item?.phoneNumber}</td>
                    <td className="text-helpertext">
                      {new Date(Number(item?.created_at)).toLocaleString()}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Switch
                        checked={item.status === "active"}
                        onChange={() => handleToggle(item)}
                      />
                    </td>
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="pr-12"
                    >
                      <Trash2 className="text-red-500 cursor-pointer" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-6 pr-6 w-full">
          <CustomPagination
            current={page}
            onChange={(p) => dispatch(setPage(p))}
            pageSize={pageSize}
            total={total}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(BarberShopTable);
