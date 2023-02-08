import React from 'react';

import {
  CarouselProvider, Slider,
  Slide, DotGroup, Dot
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function IntroSlides() {
  const dotClasses = 'w-2.5 h-1.5 bg-white/20 rounded-full disabled:w-8 disabled:bg-white';

  const Dots = () => (
    <>
      <Dot slide={0} className={dotClasses} />
      <Dot slide={1} className={dotClasses} />
      <Dot slide={2} className={dotClasses} />
    </>
  );

  return (
    <div className="w-full">
      <CarouselProvider
        isPlaying
        naturalSlideWidth={300}
        naturalSlideHeight={120}
        className="w-full"
        totalSlides={3}
      >
        <Slider className="w-full text-white">
          <Slide index={0} className="w-full">
            <h2 className="w-full text-center text-3xl tracking-widest font-semibold">
              Easy to use solution for social commerce
            </h2>
            <p className="text-base mt-5">Bridge by Alat provides a secure channel for transactions to take place</p>
          </Slide>
          <Slide index={1} className="w-full">
            <h2 className="w-full text-center text-3xl tracking-widest font-semibold">
              Easy to use solution for social commerce
            </h2>
            <p className="text-base mt-5">Bridge by Alat provides a secure channel for transactions to take place</p>
          </Slide>
          <Slide index={2} className="w-full">
            <h2 className="w-full text-center text-3xl tracking-widest font-semibold">
              Easy to use solution for social commerce
            </h2>
            <p className="text-base mt-5">Bridge by Alat provides a secure channel for transactions to take place</p>
          </Slide>
        </Slider>
        <DotGroup className="space-x-2" renderDots={Dots} />
      </CarouselProvider>
    </div>
  );
}

export default IntroSlides;
