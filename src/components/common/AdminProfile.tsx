import React from 'react';

type AdminProfileProps = {
  adminName: string;
  greetingName: string;
  avatarInitial: string;
  companyImg?: string;
};

function AdminProfile({ adminName, greetingName, avatarInitial, companyImg }: AdminProfileProps) {
  return (
    <div className="flex items-center gap-3">
      {companyImg ? (
        <img
          src={companyImg}
          alt={adminName}
          className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-[#A3195B] text-white text-sm font-semibold flex items-center justify-center shrink-0 ff-bold">
          {avatarInitial}
        </div>
      )}
      <div className="leading-tight">
        <p className="text-sm font-semibold text-textColor ff-bold">{adminName}</p>
        <p className="text-xs text-gray-400">Hello, {greetingName}</p>
      </div>
    </div>
  );
}

export default AdminProfile;