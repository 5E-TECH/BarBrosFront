import { memo } from "react";
import { Trash2 } from "lucide-react";
import { Switch, notification } from "antd";
import SearchInput from "../../../../shared/components/Search";
import avatar from "../../../../shared/assets/Avatar.png";
import { useBarberShop } from "../service/useBarberShop";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../shared/components/pageHeader";
import TableLoading from "../../../../shared/components/loadings/tableLoading";

const BarberTable = () => {
  const { getBarbershops, deleteBarberShop, updateStatusBarbershop } =
    useBarberShop();
  const { data, isLoading, refetch } = getBarbershops();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const handleToggle = (item: any) => {
    const newStatus = item.status === "active" ? "inactive" : "active";
    const oldStatus = item.status;
    item.status = newStatus;

    updateStatusBarbershop.mutate(
      { id: item.id, status: newStatus },
      {
        onSuccess: () => {
          if (newStatus === "active") {
            api.success({
              message: "Active",
              description: `${item.name} is now active`,
            });
          } else {
            api.error({
              message: "Inactive",
              description: `${item.name} is now inactive`,
            });
          }
          refetch();
        },
        onError: () => {
          api.error({
            message: "Error",
            description: "Failed to update status",
          });
          item.status = oldStatus;
          refetch();
        },
      }
    );
  };

  const formatDate = (timestamp: any) => {
    const date = new Date(Number(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <div>
      <PageHeader title="BarberShop" />
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md mt-6 md:mt-12 mb-10 dark:bg-[#191a1f]">
        {contextHolder}

        <div className="w-[94%] md:w-[97%] mt-6">
          <SearchInput />
        </div>

        <div className="w-full h-full">
          <div className="hidden lg:block overflow-x-auto">
            <table className="mt-[31px] mb-20 w-full">
              <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#1f222b]">
                <tr>
                  <th className="pl-12 text-left pb-3">BarberShop Name</th>
                  <th className="text-left pb-3">Address</th>
                  <th className="text-left pb-3">Phone number</th>
                  <th className="text-left pb-3">Establishment</th>
                  <th className="text-left pb-3">Status</th>
                  <th className="pr-12"></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.data.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`barbershop-detail/${item?.id}`)}
                    className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#1f222b]"
                  >
                    <td className="pl-12 flex flex-row gap-3.5 items-center py-5">
                      <img src={avatar} alt="" className="w-10 h-10" />
                      <div className="flex flex-col">
                        <p className="text-maintext font-medium">
                          {item?.name}
                        </p>
                        <p className="text-helpertext text-sm">{item?.email}</p>
                      </div>
                    </td>
                    <td className="text-helpertext">{item?.location}</td>
                    <td className="text-maintext">{item?.phoneNumber}</td>
                    <td className="text-helpertext">
                      {formatDate(item?.created_at)}
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
                        deleteBarberShop.mutate({ id: item.id });
                      }}
                      className="pr-12 text-right"
                    >
                      <Trash2
                        className="text-red-500 cursor-pointer inline"
                        size={20}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW (Rasmdagidek) */}
          <div className="lg:hidden flex flex-col gap-4 p-4 md:p-6">
            {data?.data?.data.map((item: any, index: number) => (
              <div
                key={item.id}
                onClick={() => navigate(`barbershop-detail/${item?.id}`)}
                className="bg-[#24262d] text-white rounded-xl p-5 space-y-4 divide-y divide-[#30333c] cursor-pointer border border-gray-800"
              >
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400 font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-3">
                    <div onClick={(e) => e.stopPropagation()}>
                      <Switch
                        size="small"
                        checked={item.status === "active"}
                        onChange={() => handleToggle(item)}
                      />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBarberShop.mutate({ id: item.id });
                      }}
                      className="p-1.5 bg-red-500/10 rounded-lg"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start pt-3">
                  <span className="text-gray-400 uppercase text-[11px] font-semibold tracking-wider">
                    BarberShop
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item?.name}</p>
                    <p className="text-[11px] text-gray-500">{item?.email}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-400 uppercase text-[11px] font-semibold tracking-wider">
                    Address
                  </span>
                  <span className="text-sm text-gray-300">
                    {item?.location}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-400 uppercase text-[11px] font-semibold tracking-wider">
                    Phone
                  </span>
                  <span className="text-sm">{item?.phoneNumber}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-400 uppercase text-[11px] font-semibold tracking-wider">
                    Date
                  </span>
                  <span className="text-sm text-gray-400">
                    {formatDate(item?.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BarberTable);
