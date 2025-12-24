import { memo } from "react";
import { useBarber } from "../service/useBarber";

const BarberTable = () => {
  const { getAllBarbers } = useBarber();
  const {data} = getAllBarbers()
  console.log(data?.data?.data);

  return (
    <div>
      <h2>BarberTable</h2>
    </div>
  );
};

export default memo(BarberTable);
