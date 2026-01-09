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
        <div className="w-full h-[80%]">
          <table className="mt-8 mb-10 w-full">
            <thead className="uppercase text-helpertext border-b border-[#e8e9eb]">
              <tr>
                <th className="w-[300px] pl-10 pb-3 text-left">FullName</th>
                <th className="w-[100px] pb-3 pr-60 ">Phone number</th>
                <th className="w-[100px] pb-3">Avg rating</th>
              </tr>
            </thead>

            <tbody>
              {barber.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-b border-[#e8e9eb] hover:bg-gray-50 text-maintext font-medium cursor-pointer dark:hover:bg-[#1f222b]"
                >
                  <td className="py-4 pl-10 flex items-center">{item.full_name}</td>
                  <td className="pl-40 text-help text-helpertext">{item.phone_number}</td>
                  <td className="pl-20">{item.avg_reyting}</td>
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
