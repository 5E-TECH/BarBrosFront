import { memo } from "react";
import { useBooking } from "../service/useBooking";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import SearchInput from "../../../../shared/components/Search";

const BookingTable = () => {
  const { getAllBookings } = useBooking();
  const { data } = getAllBookings();
  const datas = data?.data;

  if (!data) {
    return <TableLoading />;
  }

  return (
    <div>
      <div className="bg-white py-2 w-full rounded-md shadow-md dark:bg-[#191a1f] mt-12">
        <div className="w-full px-6 mt-6">
          <SearchInput />
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="mt-8 mb-10 w-full">
            <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#30333c]">
              <tr>
                <th className="w-[300px] pl-8 pb-3 text-left">FullName</th>
                <th className="w-[200px] pb-3 text-left">Booking date</th>
                <th className="w-[200px] pb-3 text-left">Booking time</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#30333c]"
                >
                  <td className="py-3 pl-8 flex items-center gap-4">
                    <div>
                      <p className="text-maintext">name</p>
                    </div>
                  </td>
                  <td className="text-helpertext">{item?.date}</td>
                  <td className="text-helpertext">{item?.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW - Rasmda so'ralgan qora card dizayni */}
        <div className="md:hidden flex flex-col gap-4 p-4">
          {datas.map((item: any, index: number) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#24262d] text-maintext dark:text-white rounded-xl p-5 space-y-4 divide-y divide-gray-100 dark:divide-[#30333c] border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <div className="flex justify-between items-center pb-2 border-b dark:border-b-0">
                <span className="text-gray-400 font-bold">#{index + 1}</span>
                <span className="bg-[#00a3ff] text-[10px] px-3 py-1 rounded-full uppercase font-bold text-white">
                  Booking
                </span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                  FullName
                </span>
                <span className="text-sm font-medium">name</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                  Date
                </span>
                <span className="text-sm">{item?.date}</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-helpertext dark:text-gray-400 uppercase text-[11px] font-semibold">
                  Time
                </span>
                <span className="text-sm font-medium">{item?.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(BookingTable);
