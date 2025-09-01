export default function AccountDetails() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>

      {/* Account Details Table */}
      <div className="bg-white">
        {/* Table Header */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 py-3 px-4 border-b border-gray-200 text-sm font-medium text-textColor/50">
          <div>Bank</div>
          <div>Account Number</div>
          <div>Account Name</div>
          <div className="hidden lg:block text-right">Actions</div>
        </div>

        {/* Table Row */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 py-4 px-4 border-b border-gray-200 items-center">
          <div className="text-sm text-gray-900">ALAT</div>
          <div className="text-sm text-gray-900">023456219</div>
          <div className="text-sm text-gray-900">John Oluseola</div>
          <div className="flex items-center justify-end space-x-2">
            {/* Edit Icon */}
            <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2599 4.09924L5.04985 12.7892C4.73985 13.1192 4.43985 13.7692 4.37985 14.2192L4.00985 17.4592C3.87985 18.6292 4.71985 19.4292 5.87985 19.2292L9.09985 18.6792C9.54985 18.5992 10.1799 18.2692 10.4899 17.9292L18.6999 9.23924C20.1199 7.73924 20.7599 6.02924 18.5499 3.93924C16.3499 1.86924 14.6799 2.59924 13.2599 4.09924Z"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.8901 5.55078C12.3201 8.31078 14.5601 10.4208 17.3401 10.7008"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 22.5H21"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            {/* Delete Icon */}
            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 6.48C17.67 6.15 14.32 5.98 10.98 5.98C9 5.98 7.02 6.08 5.04 6.28L3 6.48"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 5.47L8.72 4.16C8.88 3.21 9 2.5 10.69 2.5H13.31C15 2.5 15.13 3.25 15.28 4.17L15.5 5.47"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.85 9.64L18.2 19.71C18.09 21.28 18 22.5 15.21 22.5H8.79002C6.00002 22.5 5.91002 21.28 5.80002 19.71L5.15002 9.64"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.33 17H13.66"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.5 13H14.5"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}