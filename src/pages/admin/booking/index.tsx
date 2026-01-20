import { memo } from "react";
import BookingTable from "./components/bookingTable";
import { Outlet, useOutlet } from "react-router-dom";

const Index = () => {
  const outlet = useOutlet();
  return (
    <div>
      {!outlet && <BookingTable />}
      <Outlet />
    </div>
  );
};

export default memo(Index);