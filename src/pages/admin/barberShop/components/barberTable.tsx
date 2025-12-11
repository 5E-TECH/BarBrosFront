import { memo } from "react";
import { MoreVertical } from "lucide-react";
import SearchInput from "../../../../shared/components/Search";
import avatar from "../../../../shared/assets/Avatar.png";
import { useBarberShop } from "../service/useBarberShop";

const BarberTable = () => {
  const {getBarbershops} = useBarberShop()

  const {data} = getBarbershops()

  // const data = barberData?.data?.data
  console.log();
  
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full rounded-md shadow-md mb-10">
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
            {data?.data?.data.map((item: any) => (
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
                <td className="text-maintext">{item?.phoneNumber}</td>
                <td className="text-helpertext">
                  {(() => {
                    const date = new Date(Number(item?.created_at));
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();
                    const hours = String(date.getHours()).padStart(2, "0");
                    const minutes = String(date.getMinutes()).padStart(2, "0");

                    return `${day}-${month}-${year} ${hours}:${minutes}`;
                  })()}
                </td>
                <td ><span className={` ${item?.status ? "bg-[#fef6eb] text-[#FA8B00]" : "bg-[#faebeb] text-[#FF0000]"}  py-1.5 px-5 rounded-xl`}>{item?.status ? "Active" : "Bloked"}</span></td>
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
