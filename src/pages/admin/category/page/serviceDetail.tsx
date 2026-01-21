import { memo } from "react";
import { useService } from "../service/useService";
import { useNavigate, useParams } from "react-router-dom";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import PageHeader from "../../../../shared/components/pageHeader";
import { ChevronLeft, MapPin, Phone, Calendar } from "lucide-react";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getServiceById } = useService();
  const { data, isLoading } = getServiceById(id);

  const serviceList = data?.data?.barberShopServices || [];

  if (isLoading) {
    return <TableLoading />;
  }

  const formatDate = (timestamp: any) => {
    const date = new Date(Number(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <div className="p-2 md:p-0">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex gap-1 items-center mb-6"
      >
        <ChevronLeft
          size={30}
          color="gray"
          className="mt-[-9px] md:mt-[-3px]"
        />
        <PageHeader title="Service Detail" />
      </div>

      <div className="bg-white w-full rounded-md shadow-md dark:bg-[#191a1f] overflow-hidden">
        {serviceList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-helpertext">
            <p className="text-lg">Ma'lumot topilmadi</p>
          </div>
        ) : (
          <>
            {/* DESKTOP VIEW (Table) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="mt-4 mb-10 w-full">
                <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#1f222b]">
                  <tr>
                    <th className="pl-10 py-4 text-left font-semibold">
                      Barbershop Name
                    </th>
                    <th className="pl-10 py-4 text-left font-semibold">
                      Date of Registration
                    </th>
                    <th className="pl-10 py-4 text-left font-semibold">
                      Address
                    </th>
                    <th className="py-4 text-left font-semibold">
                      Phone number
                    </th>
                    <th className="py-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceList.map((item: any) => {
                    const shop = item?.barberShop;
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-[#e8e9eb] hover:bg-gray-50 text-maintext font-medium cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#1f222b] transition-colors"
                        onClick={() =>
                          navigate(`/barbershop-detail/${shop?.id}`)
                        }
                      >
                        <td className="py-5 pl-10">{shop?.name}</td>
                        <td className="py-5 pl-10 text-helpertext">
                          {formatDate(shop?.created_at)}
                        </td>
                        <td className="py-5 pl-10 text-helpertext">
                          {shop?.location}
                        </td>
                        <td className="py-5">{shop?.phoneNumber}</td>
                        <td className="py-5">
                          <span
                            className={`${shop?.status === "active" ? "bg-green-500" : "bg-red-500"} px-3 py-1 rounded-full text-white text-[14px]`}
                          >
                            {shop?.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE VIEW (Cards) */}
            <div className="md:hidden flex flex-col gap-4 p-4 bg-gray-50 dark:bg-[#121214]">
              {serviceList.map((item: any) => {
                const shop = item?.barberShop;
                return (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/barbershop-detail/${shop?.id}`)}
                    className="bg-white dark:bg-[#1c1d22] p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 active:scale-[0.98] transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-maintext dark:text-white uppercase tracking-tight">
                        {shop?.name}
                      </h3>
                      <span
                        className={`${shop?.status === "active" ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"} dark:bg-opacity-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase`}
                      >
                        {shop?.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-helpertext">
                        <MapPin size={16} className="shrink-0" />
                        <span className="truncate">{shop?.location}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-helpertext">
                        <Phone size={16} className="shrink-0" />
                        <span>{shop?.phoneNumber}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[12px] text-gray-400 pt-2 border-t border-gray-50 dark:border-gray-800">
                        <Calendar size={14} />
                        <span>
                          Ro'yxatdan o'tdi: {formatDate(shop?.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(ServiceDetail);
