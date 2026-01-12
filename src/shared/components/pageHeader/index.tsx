import { memo, type FC } from 'react';

interface IProps {
    title:string
}

const PageHeader:FC<IProps> = ({title}) => {
  return (
    <div className='h-10 dark:text-white'>
      <h2 className='text-maintext text-[20px] font-medium dark:text-white md:text-[28px]' >{title}</h2>
    </div>
  );
};

export default memo(PageHeader);