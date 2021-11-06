import React from 'react';
import Header from '../../components/Header/Header';
import Slider from './components/Slider/Slider';
import Footer from '../../components/Footer/Footer';
import Selection1 from './components/Selection1/Selection1';
import Selection2 from './components/Selection2/Selection2';
const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <Slider />
      <Selection1 />
      <Selection2 />
      <Footer />
    </React.Fragment>
  );
};

export default Main;
