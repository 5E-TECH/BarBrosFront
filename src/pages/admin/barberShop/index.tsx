import { memo } from "react";
import BarberShopTable from "./components/barberShopTable";
import { Outlet, useOutlet } from "react-router-dom";

const BarberShop = () => {
  const outlet = useOutlet();
  const showTable = !outlet;

  return (
    <div>
      <div>{showTable && <BarberShopTable />}</div>
      <Outlet />
    </div>
  );
};

export default memo(BarberShop);
