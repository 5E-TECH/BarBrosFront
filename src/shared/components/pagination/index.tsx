import { memo } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  current,
  pageSize
) => {
  console.log(current, pageSize);
};

const CustomPagination: React.FC<PaginationProps> = (props) => {
  return (
    <div>
      <Pagination onShowSizeChange={onShowSizeChange} {...props} />
    </div>
  );
};

export default memo(CustomPagination);
