import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs';

import DeliveryImage from '../../../assets/images/invite-image.png';

import Button from '../../inputs/Button';

function InvoiceSection() {
  const router = useRouter();

  return (
    <div className="w-full bg-primary/10">
      <div className="w-full index-content py-24">
        <div className="w-full flex flex-wrap">
          <div className="w-full mdx2:w-1/2 flex items-center max-w-xl mx-auto">
            <div className="text-center mdx2:text-left">
              <h1 className="index-title mt-10 mb-5">
                Share your invoice with easy
              </h1>
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
          <div className="w-full mdx2:w-1/2 max-w-xl mx-auto">
            <div className="w-full h-full flex items-center pt-5 mdx2:pt-0">
              <Image src={DeliveryImage} alt="Delivery image" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceSection;
