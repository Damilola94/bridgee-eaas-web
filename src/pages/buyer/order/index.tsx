"use client";

import React from "react";

import { useState } from "react";
import Head from "next/head";
import Logo from "../../../assets/svgs/logos/full-pink.svg";
import Link from "next/link";
import Image from "next/image";
import TextInput from "../../../components/inputs/Text";
import Button from "../../../components/inputs/Button";
import { formatCurrency } from "../../../utilities/general";

export default function BuyerCheckout() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const orderItems = [
    {
      id: 1,
      name: "3 piece suit",
      price: 32000.0,
      quantity: 2,
      total: 64000.0,
    },
    {
      id: 2,
      name: "Volt Desk & Table",
      price: 32000.0,
      quantity: 2,
      total: 64000.0,
    },
    {
      id: 3,
      name: "Asus Monitor Screen",
      price: 32000.0,
      quantity: 2,
      total: 64000.0,
    },
    { id: 4, name: "Alarm Clock", price: 32000.0, quantity: 2, total: 64000.0 },
  ];

  const subtotal = 64000.0;
  const deliveryFee = 2000.0;
  const escrowFee = 2000.0;
  const total = 64000.0;

  return (
    <>
      <Head>
        <title>Checkout - Bridgee Escrow</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center">
            <div className="block lg:hidden my-4 ml-2">
              <Link href="#" onClick={() => {}}>
                <Image
                  src={Logo}
                  alt="UseBridge Inc. logo"
                  priority
                  width={120}
                  height={45}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:min-h-screen bg-bg-gray-50 container mx-auto">
          {/* Left Side - Form */}
          <div className="lg:w-[45%] lg:p-12 p-6">
            <div className="hidden lg:block">
              <Link href="#" onClick={() => {}}>
                <Image
                  src={Logo}
                  alt="UseBridge Inc. logo"
                  priority
                  width={120}
                  height={45}
                  className="mb-12"
                />
              </Link>
            </div>

            <div className="w-full lg:max-w-[492px] bg-white rounded-[10px] p-8">
              <h1 className="text-2xl font-bold text-textColor mb-2">
                Welcome,
              </h1>
              <p className="text-black/40 mb-8 font-medium">
                Kindly fill the information below to complete your order
                process.
              </p>

              <form className="space-y-6">
                <TextInput
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Toluwalase Obasun"
                />

                <TextInput
                  label="Email Address"
                  name="emailAddress"
                  type="email"
                  placeholder="Email Address"
                  value={""}
                  onChange={handleInputChange}
                  className=""
                />

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                      <span className="text-green-600 mr-2">🇳🇬</span>
                      <span className="text-sm text-gray-600">+234</span>
                    </div>

                    <TextInput
                      name="phoneNumber"
                      type="tel"
                      placeholder="Phone Number"
                      value={""}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>

                <Button className="w-full bg-success py-4 !mt-10">
                  Make Payment
                </Button>
              </form>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:w-[55%] lg:p-12 p-6">
            <div className="w-full">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-textColor mb-2">
                  Order Summary
                  <span className="text-base font-normal text-textColor ml-2">
                    (Kindly confirm your order details below before making
                    payment)
                  </span>
                </h2>
              </div>

              {/* Invoice Header */}
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
                  <div className="order-2 lg:order-none">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-orange-600 text-xl">🏪</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-textColor">
                        Tolu's Store
                      </h3>
                      <p className="text-sm font-medium text-textColor pb-2">
                        291 N 4th St, Ikoyi, Lagos, Nigeria
                      </p>
                      <p className="text-sm font-medium text-grey2">
                        August 1, 2021, 12:00pm
                      </p>
                    </div>
                  </div>

                  <div className="lg:text-right mb-9 lg:mb-0">
                    <h4 className="text-3xl font-bold text-textColor pb-2">
                      Invoice #0472
                    </h4>
                    <span className="bg-[#DEF7EC] text-textGreen text-xs font-medium px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Recipient and Order Details */}
                <div className="grid lg:grid-cols-2 gap-6 mb-10 lg:mb-8">
                  <div>
                    <h4 className="text-base font-bold text-textColor mb-2">
                      Recipient Details
                    </h4>
                    <p className="text-base text-textColor">Oluseola John</p>
                    <p className="text-base text-grey2">
                      oluseolajohn@gmail.com
                    </p>
                    <p className="text-base text-grey2">+234 808 857 9392</p>
                    <p className="text-base text-grey2">
                      54 Marina, Lagos Island, Lagos
                    </p>
                  </div>

                  <div className="lg:text-right">
                    <h4 className="font-bold text-base text-textColor mb-2">
                      Order Details
                    </h4>
                    <p className="text-base text-grey2">
                      Payment Type:&nbsp;
                      <span className="text-textColor">Bank Transfer</span>
                    </p>
                    <p className="text-base text-grey2">
                      Dispute Manager:&nbsp;
                      <span className="text-textColor">Bridgee Escrow</span>
                    </p>
                    <p className="text-base text-grey2">
                      Inspection Period:&nbsp;
                      <span className="text-textColor">2 Hours</span>
                    </p>
                    <p className="text-base text-grey2">
                      Due Date:&nbsp;
                      <span className="text-textColor">
                        Jan 12, 2025; 2:00pm
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order Items Table */}
                <div className="overflow-x-auto">
                  <div className="gap-0 bg-white">
                    {/* Header Row */}
                    <section className="grid grid-cols-[100px_1fr_1fr]  lg:grid-cols-[60px_1fr_1fr_1fr_1fr]">
                      <div className="bg-[#EEEEEE] py-3 px-3 text-sm font-semibold text-gray-700">
                        #
                      </div>
                      <div className="bg-[#EEEEEE] py-3 px-4 text-sm font-semibold text-gray-700">
                        Item
                      </div>
                      <div className="hidden lg:block bg-[#EEEEEE] py-3 px-4 text-sm font-semibold text-gray-700">
                        Price
                      </div>
                      <div className="hidden lg:block bg-[#EEEEEE] py-3 px-4 text-sm font-semibold text-gray-700">
                        Unit
                      </div>
                      <div className="bg-[#EEEEEE] py-3 px-4 text-sm font-semibold text-gray-700">
                        TOTAL
                      </div>
                    </section>

                    {/* Data Rows */}
                    {orderItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[100px_1fr_1fr] lg:grid-cols-[60px_1fr_1fr_1fr_1fr]"
                      >
                        <div className="py-4 px-3 text-sm text-gray-600 ">
                          {index + 1}
                        </div>
                        <div className="py-4 px-4 text-sm text-gray-900 flex flex-col lg:block">
                          {item.name}
                          <span className="text-grey2 lg:hidden">{`Quantity: ${item.quantity}`}</span>
                        </div>
                        <div className="hidden lg:block py-4 px-4 text-sm text-gray-600">
                          NGN {formatCurrency(item.price)}
                        </div>
                        <div className="hidden lg:block py-4 px-4 text-sm text-gray-600">
                          {item.quantity}
                        </div>
                        <div className="py-4 px-4 text-sm font-semibold text-gray-900">
                          NGN {formatCurrency(item.total)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 w-full flex justify-between lg:justify-end">
                  <div className="space-y-3 lg:space-y-2 w-full lg:w-auto">
                    <div className="flex text-sm gap-x-14 justify-between">
                      <span className="text-gray-600">SUBTOTAL</span>
                      <span className="font-semibold">
                        NGN {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <div className="flex text-sm gap-x-14 justify-between">
                      <span className="text-gray-600">Delivery fee</span>
                      <span className="font-semibold">
                        {formatCurrency(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex text-sm gap-x-14 justify-between">
                      <span className="text-gray-600">Escrow fee (5%)</span>
                      <span className="font-semibold">
                        {formatCurrency(escrowFee)}
                      </span>
                    </div>
                    <div className="flex gap-x-14 text-lg font-bold pt-2 justify-between">
                      <span>TOTAL</span>
                      <span>NGN {formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
