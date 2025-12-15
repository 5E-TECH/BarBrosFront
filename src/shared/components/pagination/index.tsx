import { memo } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";


const CustomPagination: React.FC<PaginationProps> = (props) => {
  return (
    <div>
      <Pagination {...props} />
    </div>
  );
};

export default memo(CustomPagination);
