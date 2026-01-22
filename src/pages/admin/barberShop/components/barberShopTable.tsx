import { memo, useEffect, type FC } from "react";
import { Trash2 } from "lucide-react";
import { Switch, notification } from "antd";
import { useBarberShop } from "../service/useBarberShop";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../shared/components/pageHeader";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import CustomPagination from "../../../../shared/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../shared/components/pagination/store/paginationSlice";
import type { RootState } from "../../../../app/store";
import Search from "../../../../shared/components/Search";
import profile from "../../../profile";
import { useSubscription } from "../../Subscribe/service/useSubscription";

const BarberShopTable: FC = () => {
  const { getBarbershops, deleteBarberShop, updateStatusBarbershop } =
    useBarberShop();

  const { getAllSubscription } = useSubscription();
  const { data: subscriptionData } = getAllSubscription();

  console.log(subscriptionData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const { page, limit } = useSelector(
    (state: RootState) => state.paginationSlice,
  );
  const searchTerm = useSelector((state: RootState) => state.search.userSearch);

  const params = { page, limit, search: searchTerm };

  const { data, isLoading, refetch } = getBarbershops(params);

  const items = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? limit;

  // Search o'zgarganda page'ni 1 ga qaytarish
  useEffect(() => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  }, [searchTerm, dispatch]);

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
      },
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
      },
    );
  };

  if (isLoading) return <TableLoading />;

  return (
    <div>
      <PageHeader title="BarberShop" />
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md mt-12 mb-10 dark:bg-[#191a1f]">
        {contextHolder}

        <div className="w-[97%] mt-6 px-3 md:px-0">
          <Search />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 w-full">
            <p className="text-helpertext text-lg">
              {searchTerm ? "Qidiruv natijasi topilmadi" : "Ma'lumot yo'q"}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="mt-[31px] mb-20 w-full">
                <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#1f222b]">
                  <tr>
                    <th className="pl-12 pb-3 text-left">BarberShop Name</th>
                    <th className="pb-3 text-left">Address</th>
                    <th className="pb-3 text-left">Subscription</th>
                    <th className="pb-3 text-left">Phone number</th>
                    <th className="pb-3 text-left">Date of registration</th>
                    <th className="pb-3 text-left">Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item: any) => (
                    <tr
                      key={item.id}
                      onClick={() => navigate(`barbershop-detail/${item?.id}`)}
                      className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#1f222b]"
                    >
                      <td className="pl-12 flex items-center gap-4 py-3">
                        {item?.img ? (
                          <img
                            src={`${import.meta.env.VITE_ASSET_BASE_URL}${item?.img}`}
                            alt={item?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center">
                            <profile.type />
                          </div>
                        )}
                        <div>
                          <p className="text-maintext">{item?.name}</p>
                          <p className="text-helpertext">{item?.email}</p>
                        </div>
                      </td>
                      <td className="text-helpertext">
                        {item?.location?.length > 20
                          ? item.location.slice(0, 20) + "..."
                          : item?.location}
                      </td>
                      <td className="text-helpertext">{
                        subscriptionData?.data?.map((subscribe:any) => (
                         subscribe?.id === item?.subscriptions?.[0]?.plan_id ? subscribe?.name : ""
                        ))}
                        {/* {item?.subscriptions?.[0]?.plan_id} */}
                      </td>
                      <td className="text-maintext">{item?.phoneNumber}</td>
                      <td className="text-helpertext">
                        {new Date(Number(item?.created_at)).toLocaleString()}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <Switch
                          checked={item?.status === "active"}
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden flex flex-col gap-4 p-4 w-full">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`barbershop-detail/${item?.id}`)}
                  className="bg-white dark:bg-[#24262d] text-maintext dark:text-white rounded-xl p-5 space-y-3 border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      {item?.img ? (
                        <img
                          src={`${import.meta.env.VITE_ASSET_BASE_URL}${item?.img}`}
                          alt={item?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <profile.type />
                        </div>
                      )}
                      <div>
                        <p className="text-[16px] font-bold text-maindark dark:text-white">
                          {item?.name}
                        </p>
                        <p className="text-xs text-helpertext">{item?.email}</p>
                      </div>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <Switch
                        checked={item?.status === "active"}
                        onChange={() => handleToggle(item)}
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-helpertext dark:text-gray-400 font-medium">
                        Address:
                      </span>
                      <span className="dark:text-gray-200">
                        {item?.location}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-helpertext dark:text-gray-400 font-medium">
                        Phone:
                      </span>
                      <span className="dark:text-gray-200">
                        {item?.phoneNumber}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-helpertext dark:text-gray-400 font-medium">
                        Created:
                      </span>
                      <span className="dark:text-gray-200">
                        {new Date(
                          Number(item?.created_at),
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="flex items-center gap-2 text-red-500 text-sm font-medium"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
          </>
        )}
      </div>
    </div>
  );
};

export default memo(BarberShopTable);
