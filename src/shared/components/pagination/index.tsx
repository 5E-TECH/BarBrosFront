import { memo } from "react";
import { Pagination as AntPagination } from "antd";

const CustomPagination = () => {
  const onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current, pageSize);
  };

  return (
    <div>
      <AntPagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
      />
    </div>
  );
};

export default memo(CustomPagination);
