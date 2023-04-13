import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs';

import DeliveryImage from '../../../assets/images/delivery-image.png';

import Button from '../../inputs/Button';

function DeliverySection() {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="w-full index-content pt-28 pb-32">
        <div className="w-full flex flex-wrap flex-col-reverse mdx2:flex-row">
          <div className="w-full mdx2:w-1/2 max-w-xl mx-auto">
            <div className="w-full h-full flex items-center mt-5 mdx2:mt-0">
              <Image src={DeliveryImage} alt="Delivery image" className="w-full h-auto" />
            </div>
          </div>
          <div className="w-full mdx2:w-1/2 flex items-center max-w-xl mx-auto">
            <div className="w-full text-center mdx2:text-left">
              <div className="index-title mt-10 mb-10">
                <h1 className="">Embedded delivery solution to facilitate</h1>
                <h1 className="text-primary">rapid delivery</h1>
              </div>
              <p className="text-xl mb-12">
                This allows you to deliver and receive orders quickly, reducing delivery times and improving customer satisfaction
              </p>
              <div className="inline-block mb-10">
                <Button
                  onClick={() => router.push('/login')}
                  fontSize="text-sm"
                  bgColor="bg-primary"
                  paddingX="px-5"
                  paddingY="py-3"
                >
                  Get started now
                  <BsArrowRight className="ml-3 w-6 h-auto" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliverySection;
