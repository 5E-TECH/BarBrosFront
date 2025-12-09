import { memo, type FC } from 'react';

interface IProps {
    title:string
}

const PageHeader:FC<IProps> = ({title}) => {
  return (
    <div>
      <h2 className='text-maintext text-[28px] font-medium mb-[41px]'>{title}</h2>
    </div>
  );
};

export default memo(PageHeader);