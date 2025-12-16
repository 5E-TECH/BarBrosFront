import { memo } from "react";
import CategoryBox from "./components/CategoryBox";
import { useCategory } from "./service/useCategory";

const Categories = () => {
  const { getCategory: data } = useCategory();

  return (
    <div>
      <CategoryBox />
    </div>
  );
};

export default memo(Categories);
