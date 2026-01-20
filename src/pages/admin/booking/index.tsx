import { memo, useState } from "react";
import BookingTable from "./components/bookingTable";
import { Outlet, useOutlet } from "react-router-dom";
import { useBooking } from "./service/useBooking";

const Index = () => {
  const outlet = useOutlet();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { getAllBookings } = useBooking();
  const { data } = getAllBookings(page, pageSize);

  return (
    <div>
      {!outlet && (
        <BookingTable
          data={data?.data || []}
          page={page}
          total={data?.total || 0}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onSearch={(val) => console.log(val)}
        />
      )}
      <Outlet />
    </div>
  );
};

export default memo(Index);
