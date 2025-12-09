import { memo } from "react";
import { MoreVertical } from "lucide-react";
import SearchInput from "../../../../shared/components/Search";
import avatar from "../../../../shared/assets/Avatar.png";

const data = [
  {
    id: 1,
    name: "BarberShop",
    email: "cooper@example.com",
    location: "Sochi, Russia",
    phone: "+1 (070) 123–4567",
    date: "12.09.2025",
    status: "Active",
  },
  {
    id: 2,
    name: "BarberShop",
    email: "black@example.com",
    location: "France, Paris",
    phone: "+1 (070) 123–8459",
    date: "12.09.2025",
    status: "Active",
  },
  {
    id: 3,
    name: "BarberShop",
    email: "robe@example.com",
    location: "Sydney, Australia",
    phone: "+1 (070) 123–9221",
    date: "12.09.2025",
    status: "Bloked",
  },
  {
    id: 4,
    name: "BarberShop",
    email: "cooper@example.com",
    location: "Sochi, Russia",
    phone: "+1 (070) 123–4567",
    date: "12.09.2025",
    status: "Active",
  },
  {
    id: 5,
    name: "BarberShop",
    email: "black@example.com",
    location: "France, Paris",
    phone: "+1 (070) 123–8459",
    date: "12.09.2025",
    status: "Active",
  },
  {
    id: 6,
    name: "BarberShop",
    email: "robe@example.com",
    location: "Sydney, Australia",
    phone: "+1 (070) 123–9221",
    date: "12.09.2025",
    status: "Active",
  },
  {
    id: 7,
    name: "BarberShop",
    email: "cooper@example.com",
    location: "Sochi, Russia",
    phone: "+1 (070) 123–4567",
    date: "12.09.2025",
    status: "Active",
  },
  {
    id: 8,
    name: "BarberShop",
    email: "black@example.com",
    location: "France, Paris",
    phone: "+1 (070) 123–8459",
    date: "12.09.2025",
    status: "Active",
  },
  {
    id: 9,
    name: "BarberShop",
    email: "robe@example.com",
    location: "Sydney, Australia",
    phone: "+1 (070) 123–9221",
    date: "12.09.2025",
    status: "Active",
  },
  {
    id: 10,
    name: "BarberShop",
    email: "cooper@example.com",
    location: "Sochi, Russia",
    phone: "+1 (070) 123–4567",
    date: "12.09.2025",
    status: "Active",
  },
];

const BarberTable = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md">
      <div className="w-[97%] mt-6">
        <SearchInput />
      </div>
      <div className="w-full h-[80%]">
        <table className="mt-[31px] mb-20 w-full">
          <thead className="uppercase text-helpertext border-b border-[#e8e9eb]">
            <tr className="">
              <th className="pl-14 pr-[172px] pb-3">BarberShop nomi</th>
              <th className="pr-[172px] pb-3">Manzili</th>
              <th className="pr-[172px] pb-3">Telefon raqami</th>
              <th className="pr-[172px] pb-3">Tashkil qilingan sana</th>
              <th className="pr-[150px] pb-3">Status</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any) => (
              <tr className=" border-b border-[#e8e9eb] pl-10 ">
                <td className="pl-12 flex flex-row gap-3.5 items-center">
                  <div>
                    <img src={avatar} alt="" />
                  </div>
                  <div className="flex flex-col py-2.5">
                    <p className="text-maintext">{item?.name}</p>
                    <p className="text-helpertext">{item?.email}</p>
                  </div>
                </td>
                <td className="text-helpertext">{item?.location}</td>
                <td className="text-maintext">{item?.phone}</td>
                <td className="text-helpertext">{item?.date}</td>
                <td ><span className={` ${item?.status === "Active" ? "bg-[#fef6eb] text-[#FA8B00]" : "bg-[#faebeb] text-[#FF0000]"}  py-1.5 px-5 rounded-xl`}>{item?.status}</span></td>
                <td className="pr-6">
                  <MoreVertical color="#8A9099" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(BarberTable);
