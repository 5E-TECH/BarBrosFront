import { memo } from 'react';
import Header from './components/header';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer';

const MainLyaout = () => {
  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default memo(MainLyaout);