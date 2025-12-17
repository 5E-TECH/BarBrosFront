import { memo } from "react";
import CategoryBox from "./components/CategoryBox";

const Categories = () => {

  return (
    <div>
      <CategoryBox />
    </div>
  );
};

export default memo(Categories);
