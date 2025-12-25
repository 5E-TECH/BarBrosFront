import { memo } from "react";
import BarberTable from "./components/barberShopTable";
import { Outlet, useOutlet } from "react-router-dom";

const BarberShop = () => {
  const outlet = useOutlet();
  const showTable = !outlet;

  return (
    <div>
      <div>{showTable && <BarberTable />}</div>
      <Outlet />
    </div>
  );
};

export default memo(BarberShop);
