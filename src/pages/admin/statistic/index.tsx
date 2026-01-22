import { memo } from "react";
import Statistics from "./components/Statistics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="mx-auto">
        <Statistics />
      </div>
    </div>
  );
};

export default memo(Index);
