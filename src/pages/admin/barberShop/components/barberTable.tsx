import { memo } from "react";
import { useBarber } from "../service/useBarber";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import { useParams } from "react-router-dom";

const BarberTable = () => {
  const { getBarberShopBarbers } = useBarber();
  const { id } = useParams();
  const { data, isLoading } = getBarberShopBarbers(id);
  const barber = data?.data;

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md dark:bg-[#191a1f]">
        <div className="w-full h-full">
          <div className="hidden md:block overflow-x-auto">
            <table className="mt-8 mb-10 w-full">
              <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#1f222b]">
                <tr>
                  <th className="pl-10 pb-3 text-left">FullName</th>
                  <th className="pb-3 text-left">Phone number</th>
                  <th className="pb-3 text-left">Avg rating</th>
                </tr>
              </thead>

              <tbody>
                {barber?.map((item: any) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e8e9eb] hover:bg-gray-50 text-maintext font-medium cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#1f222b]"
                  >
                    <td className="py-4 pl-10">{item.full_name}</td>
                    <td className="text-helpertext">{item.phone_number}</td>
                    <td className="py-4 pl-10">{item.avg_reyting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col gap-4 p-4">
            {barber?.map((item: any, index: number) => (
              <div
                key={item.id}
                className="bg-[#24262d] text-white rounded-xl p-5 space-y-4 divide-y divide-[#30333c] border border-gray-800"
              >
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400 font-bold">#{index + 1}</span>
                  <span className="bg-[#00a3ff] text-[10px] px-3 py-1 rounded-full uppercase font-bold">
                    Barber
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-400 uppercase text-[11px] font-semibold">
                    FullName
                  </span>
                  <span className="text-sm">{item.full_name}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-400 uppercase text-[11px] font-semibold">
                    Phone
                  </span>
                  <span className="text-sm">{item.phone_number}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-400 uppercase text-[11px] font-semibold">
                    Avg Rating
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-yellow-500 font-bold">
                      {item.avg_reyting}
                    </span>
                    <span className="text-[10px] text-gray-500">/ 5.0</span>
                  </div>
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
