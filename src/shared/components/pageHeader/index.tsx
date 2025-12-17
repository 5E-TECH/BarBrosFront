import { memo, type FC } from 'react';

interface IProps {
    title:string
}

const PageHeader:FC<IProps> = ({title}) => {
  return (
    <div className='h-10'>
      <h2 className='text-maintext text-[28px] font-medium' >{title}</h2>
    </div>
  );
};

export default memo(PageHeader);