import { memo } from "react";
import { useService } from "../service/useService";
import { useNavigate, useParams } from "react-router-dom";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import PageHeader from "../../../../shared/components/pageHeader";
import { ChevronLeft, MapPin, Phone, Scissors, Users, Home } from "lucide-react";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getServiceById } = useService();
  const { data, isLoading } = getServiceById(id);

  const serviceData = data?.data || {};
  const serviceList = serviceData?.barberShopServices || [];

  // Statistikani hisoblash
  const totalBarberShops = serviceList.length;
  
  // Har bir barbershop ichidagi barberlar sonini yig'ib chiqish
  const totalBarbers = serviceList.reduce((acc: number, item: any) => {
    return acc + (item?.barberShop?.barber?.length || 0);
  }, 0);

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
    <div className="p-2 md:p-0 mb-10">
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

      {/* HEADER SECTION - Nomi, Rasmi va Description */}
      <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-12 bg-white px-6 md:px-10 py-9 rounded-2xl dark:bg-[#191a1f] shadow-sm mb-8">
        <div className="w-full lg:w-[20%] flex flex-col items-center border-b lg:border-b-0 pb-6 lg:pb-0 justify-center">
          <div className="w-[120px] h-[120px] rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 overflow-hidden border border-gray-200 dark:border-gray-700">
            {serviceData?.img ? (
              <img 
                src={`${import.meta.env.VITE_ASSET_BASE_URL}${serviceData.img}`} 
                alt={serviceData.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Scissors size={50} className="text-main" />
            )}
          </div>
          <span className="px-6 py-1.5 rounded-full text-xs font-extrabold uppercase text-white bg-main shadow-sm">
            Service
          </span>
        </div>

        <div className="w-full lg:w-[80%] flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <label className="text-helpertext text-[14px] font-medium pb-1.5">Service Name:</label>
            <h1 className="text-maintext text-[20px] md:text-[24px] font-bold border-b border-gray-100 dark:border-gray-800 pb-2">
              {serviceData?.name || "Nomsiz xizmat"}
            </h1>
          </div>
          
          <div className="flex flex-col w-full mt-2">
            <label className="text-helpertext text-[14px] font-medium pb-1.5">Description:</label>
            <p className="text-maintext text-[15px] leading-relaxed bg-gray-50 dark:bg-[#1f222b] p-4 rounded-xl italic">
              {serviceData?.description || "Ushbu xizmat haqida ma'lumot kiritilmagan."}
            </p>
          </div>
        </div>
      </div>

      {/* STATISTICS CARDS - Barbershops va Barbers soni */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 shadow-sm flex items-center gap-6 border border-transparent hover:border-main/20 transition-all">
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
            <Home size={32} className="text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-maintext dark:text-white leading-none mb-1">
              {totalBarberShops}
            </h3>
            <p className="text-sm font-medium text-helpertext uppercase tracking-wider">Barbershops Linked</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 shadow-sm flex items-center gap-6 border border-transparent hover:border-main/20 transition-all">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <Users size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-maintext dark:text-white leading-none mb-1">
              {totalBarbers}
            </h3>
            <p className="text-sm font-medium text-helpertext uppercase tracking-wider">Available Barbers</p>
          </div>
        </div>
      </div>

      <div className="bg-white w-full rounded-md shadow-md dark:bg-[#191a1f] overflow-hidden">
        {/* Table qismi o'zgarishsiz qoldi */}
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
                    <th className="pl-10 py-4 text-left font-semibold">Barbershop Name</th>
                    <th className="pl-10 py-4 text-left font-semibold">Date of Registration</th>
                    <th className="pl-10 py-4 text-left font-semibold">Address</th>
                    <th className="py-4 text-left font-semibold">Phone number</th>
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
                        onClick={() => navigate(`/barbershop/barbershop-detail/${shop?.id}`)}
                      >
                        <td className="py-5 pl-10">{shop?.name}</td>
                        <td className="py-5 pl-10 text-helpertext">{formatDate(shop?.created_at)}</td>
                        <td className="py-5 pl-10 text-helpertext">{shop?.location}</td>
                        <td className="py-5">{shop?.phoneNumber}</td>
                        <td className="py-5">
                          <span className={`${shop?.status === "active" ? "bg-green-500" : "bg-red-500"} px-3 py-1 rounded-full text-white text-[14px]`}>
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
                    className="bg-white dark:bg-[#1c1d22] p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-maintext dark:text-white uppercase tracking-tight">
                        {shop?.name}
                      </h3>
                      <span className={`${shop?.status === "active" ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"} dark:bg-opacity-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase`}>
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