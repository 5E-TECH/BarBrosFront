import { memo } from "react";
import Search from "../../../../shared/components/Search";
import avatar from "../../../../shared/assets/Avatar.png";
import Pagination from "../../../../shared/components/pagination";

const data = [
  {
    id: 1,
    name: "BarberShop",
    email: "cooper@example.com",
    phone: "+1 (070) 123–4567",
    date: "12.09.2025",
  },
  {
    id: 2,
    name: "BarberShop",
    email: "black@example.com",
    phone: "+1 (070) 123–8459",
    date: "12.09.2025",
  },
];

const UsersTable = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md">
      <div className="w-[97%] mt-6">
        <Search />
      </div>

      <div className="w-full h-[80%]">
        <table className="mt-8 mb-10 w-full">
          <thead className="uppercase text-helpertext border-b border-[#e8e9eb]">
            <tr>
              <th className="w-[50px] pb-3 text-left pl-8">
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
              </th>
              <th className="w-[300px] pb-3 text-left">Ism familiya</th>
              <th className="w-[200px] pb-3 text-left">
                Ro'yxatdan o'tgan sana
              </th>
              <th className="w-[100px] pb-3 text-left">Telefon raqami</th>
              <th className="w-[100px]"></th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item: any) => (
              <tr
                key={item.id}
                className="border-b border-[#e8e9eb] hover:bg-gray-50"
              >
                <td className="py-3 pl-8">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                </td>

                <td className="py-3 flex items-center gap-4">
                  <img src={avatar} alt="" className="w-10 h-10" />
                  <div>
                    <p className="text-maintext">{item?.name}</p>
                    <p className="text-helpertext">{item?.email}</p>
                  </div>
                </td>

                <td className="text-helpertext">{item?.date}</td>
                <td className="text-maintext">{item?.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end px-6 mb-10">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default memo(UsersTable);
