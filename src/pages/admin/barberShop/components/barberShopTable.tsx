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

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <div>
      <PageHeader title="BarberShop" />
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md mt-6 mb-10">
        {contextHolder}

        <div className="w-[97%] mt-6">
          <SearchInput />
        </div>

        <div className="w-full h-[80%]">
          <table className="mt-[31px] mb-20 w-full">
            <thead className="uppercase text-helpertext border-b border-[#e8e9eb]">
              <tr>
                <th className="pl-12 pr-[172px] pb-3">BarberShop Name</th>
                <th className="pr-[172px] pb-3">Address</th>
                <th className="pr-[172px] pb-3">Phone number</th>
                <th className="pr-[172px] pb-3">Date of establishment</th>
                <th className="pr-[150px] pb-3">Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.data?.data.map((item: any) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`barbershop-detail/${item?.id}`)}
                  className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer  "
                >
                  <td className="pl-12 flex flex-row gap-3.5 items-center">
                    <div>
                      <img src={avatar} alt="" />
                    </div>
                    <div className="flex flex-col py-5">
                      <p className="text-maintext">{item?.name}</p>
                      <p className="text-helpertext">{item?.email}</p>
                    </div>
                  </td>
                  <td className="text-helpertext">{item?.location}</td>
                  <td className="text-maintext">{item?.phoneNumber}</td>
                  <td className="text-helpertext">
                    {(() => {
                      const date = new Date(Number(item?.created_at));
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const year = date.getFullYear();
                      const hours = String(date.getHours()).padStart(2, "0");
                      const minutes = String(date.getMinutes()).padStart(
                        2,
                        "0"
                      );

                      return `${day}-${month}-${year} ${hours}:${minutes}`;
                    })()}
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
                    className="pr-12"
                  >
                    <Trash2 className="text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(BarberTable);
