import { memo, useEffect } from "react";
import TableLoading from "../../../../../shared/components/loadings/tableLoading";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import { setPage } from "../../../../../shared/components/pagination/store/paginationSlice";
import { useUsers } from "../../service/useUser";

interface UserDetailTableProps {
  userId: string | undefined;
}

const UserDetailTable = ({ userId }: UserDetailTableProps) => {
  const { getByUserIdBooking } = useUsers();
  
  // API dan ma'lumot olish - enabled parametri bilan
  const { data, isLoading } = getByUserIdBooking({ id: userId });
  
  const searchTerm = useSelector((state: RootState) => state.search.userSearch);
  const page = useSelector((state: RootState) => state.paginationSlice.page);
  // selectedStatus ni kerak bo'lsa qo'shing
  // const selectedStatus = useSelector((state: RootState) => state.someSlice.selectedStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  }, [searchTerm, dispatch, page]);

  const formatDate = (timestamp: any) => {
    const date = new Date(Number(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-500",
    confirmed: "bg-blue-600",
    completed: "bg-green-500",
    cancelled: "bg-red-600",
  };

  const statusPayment: Record<string, string> = {
    pending: "bg-amber-500",
    paid: "bg-green-500",
    failed: "bg-red-600",
  };

  if (isLoading) {
    return <TableLoading />;
  }

  // Ma'lumotni array sifatida olish
  const datas = data?.data || [];

  return (
    <div>
      <div className="hidden md:block overflow-x-auto">
        <table className="mt-8 mb-10 w-full">
          <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#30333c]">
            <tr>
              <th className="w-[300px] pl-16 pb-3 text-left">user name</th>
              <th className="w-[300px] pl-16 pb-3 text-left">
                date of registration
              </th>
              <th className="w-[300px] pl-16 pb-3 text-left">booking date</th>
              <th className="w-[200px] pb-3 text-left">Booking time</th>
              <th className="w-[200px] pb-3 text-left">Booking status</th>
              <th className="w-[200px] pb-3 text-left">order Type</th>
              <th className="w-[200px] pb-3 text-left">payment status</th>
            </tr>
          </thead>
          <tbody>
            {datas.length > 0 ? (
              datas.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#30333c]"
                >
                  <td className="py-3 pl-16 flex items-center gap-4">
                    <div>
                      <p className="text-maintext">{item?.user?.full_name}</p>
                    </div>
                  </td>
                  <td className="text-helpertext pl-16">
                    {formatDate(item?.created_at)}
                  </td>
                  <td className="text-helpertext pl-16">{item?.date}</td>
                  <td className="text-helpertext pl-1">{item?.time}</td>
                  <td className="pl-1 py-3">
                    <span
                      className={`px-3 py-1 text-white rounded-full ${
                        statusStyles[item?.status?.toLowerCase()] || "bg-gray-400"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td className="pl-1 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-white rounded-full ${
                        item?.order_type === "online"
                          ? "bg-green-500"
                          : "bg-red-600"
                      }`}
                    >
                      {item?.order_type}
                    </span>
                  </td>
                  <td className="text-helpertext pl-1">
                    <span
                      className={`px-3 py-1 text-white rounded-full ${
                        statusPayment[item?.payment_status?.toLowerCase()] ||
                        "bg-gray-400"
                      }`}
                    >
                      {item?.payment_status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-helpertext">
                  Bookinglar topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(UserDetailTable);