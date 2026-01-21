import { memo } from "react";
import { useService } from "../service/useService";
import { useNavigate, useParams } from "react-router-dom";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import PageHeader from "../../../../shared/components/pageHeader";
import { ChevronLeft } from "lucide-react";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getServiceById } = useService();
  const { data, isLoading } = getServiceById(id);

  const serviceList = data?.data?.barberShopServices || [];

  console.log("Tekshirilgan serviceList:", serviceList);

  if (isLoading) {
    return <TableLoading />;
  }

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

      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md dark:bg-[#191a1f]">
        <div className="w-full h-full">
          <div className="hidden md:block overflow-x-auto">
            <table className="mt-8 mb-10 w-full">
              <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#1f222b]">
                <tr>
                  <th className="pl-10 pb-3 text-left">Barbershop Name</th>
                  <th className="pl-10 pb-3 text-left">Address</th>
                  <th className="pb-3 text-left">Phone number</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {serviceList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-8 text-helpertext"
                    >
                      Ma'lumot topilmadi
                    </td>
                  </tr>
                ) : (
                  serviceList.map((item: any) => {
                    const shop = item?.barberShop;

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-[#e8e9eb] hover:bg-gray-50 text-maintext font-medium cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#1f222b]"
                        onClick={() =>
                          navigate(`/barbershop-detail/${shop?.id}`)
                        }
                      >
                        <td className="py-5 pl-10 flex items-center gap-3">
                          {shop?.name}
                        </td>
                        <td className="text-helpertext pl-10">
                          {shop?.location}{" "}
                        </td>
                        <td >{shop?.phoneNumber} </td>
                        <td >
                          <span
                            className={
                              shop?.status === "active"
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {shop?.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* <div className="md:hidden flex flex-col gap-4 p-4">
            {serviceList?.map((item: any, index: number) => (
              <div
                key={item.id}
                onClick={() => navigate(`/barbershop/barber-detail/${item.id}`)}
                className="bg-white dark:bg-[#24262d] text-maintext dark:text-white rounded-xl p-5 space-y-4 divide-y divide-gray-100 dark:divide-[#30333c] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors cursor-pointer hover:shadow-md"
              >
                <div className="flex justify-between items-center pb-2">
                  <span className="text-helpertext dark:text-gray-400 font-bold">
                    #{index + 1}
                  </span>
                  <span className="bg-[#00a3ff] text-[10px] px-3 py-1 rounded-full uppercase font-bold text-white">
                    Barber
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                    FullName
                  </span>
                  <span className="text-sm font-medium">{item.full_name}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                    Phone
                  </span>
                  <span className="text-sm">{item.phone_number}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                    Avg Rating
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-yellow-500 font-bold">
                      {item.avg_reyting}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      / 5.0
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* Empty State */}
          {/* {serviceList?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Barbers Available
              </h3>
              <p className="text-gray-500">
                Check back later for available barbers
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default memo(ServiceDetail);
