import React, { useState } from 'react';
import Image from 'next/image';
import { BiPlus } from 'react-icons/bi';
import { RiErrorWarningLine } from 'react-icons/ri';

import EditIcon from '../../../assets/svgs/edit.svg';
import TrashIcon from '../../../assets/svgs/trash.svg';

import Button from '../../inputs/Button';
import AddAccount from './AddAccount';

function BankAccounts() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="w-full max-w-3xl bg-white rounded-xl px-10 py-7 shadow">
        <div className="w-full">
          <div className="flex flex-wrap justify-between items-start mb-5">
            <h2 className="font-bold text-xl mb-2">Bank Accounts</h2>
            <Button paddingX="px-3" paddingY="pt-2 pb-1.5" onClick={() => setShowModal(true)}>
              <BiPlus className="mr-1 mb-1" />
              Add new account
            </Button>
          </div>

          <div className="w-full mb-5 overflow-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="pr-3 py-3">Bank</th>
                  <th className="pr-3 py-3">Account Name</th>
                  <th className="pr-3 py-3">Account Number</th>
                  <th>{null}</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="pr-3 py-3">Alat by WEMA</td>
                  <td className="pr-3 py-3">Chuksjoe orji</td>
                  <td className="pr-3 py-3">0239930021</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="">
                        <Image src={EditIcon} alt="icon" className="w-6 h-6 mr-1" />
                      </button>
                      <button className="">
                        <Image src={TrashIcon} alt="icon" className="w-6 h-6 mr-1" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="pr-3 py-3">Alat by WEMA</td>
                  <td className="pr-3 py-3">Chuksjoe orji</td>
                  <td className="pr-3 py-3">0239930021</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="">
                        <Image src={EditIcon} alt="icon" className="w-6 h-6 mr-1" />
                      </button>
                      <button className="">
                        <Image src={TrashIcon} alt="icon" className="w-6 h-6 mr-1" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-end">
            <RiErrorWarningLine className="w-6 h-6 mr-1 text-lightText" />
            <p className="text-lightText">
              Register a maximum of 5 bank accounts
            </p>
          </div>
        </div>
      </div>

      {showModal && <AddAccount onClose={() => setShowModal(false)} />}
    </>
  );
}

export default BankAccounts;
