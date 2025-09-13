import { useState } from "react";

export default function Support() {
  const [selectedSupportOption, setSelectedSupportOption] = useState<
    string | null
  >(null);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 h-full">
      {/* Left Container - Support Options */}
      <div className="lg:w-1/2">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Support</h2>
          <p className="text-gray-600 mb-6">
            You can reach us on any of the platforms below should you have any
            questions or experience any issue.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => setSelectedSupportOption("FAQs")}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors group ${
                selectedSupportOption === "FAQs"
                  ? "bg-success text-white"
                  : "border border-success hover:bg-success"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedSupportOption === "FAQs"
                      ? "bg-white bg-opacity-20"
                      : "bg-purple-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      selectedSupportOption === "FAQs"
                        ? "text-white"
                        : "text-purple-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">FAQs</span>
              </div>
              <svg
                className={`w-5 h-5 transition-colors ${
                  selectedSupportOption === "FAQs"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-purple-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Chat With Us */}
            <button
              onClick={() => setSelectedSupportOption("Chat")}
              className="w-full flex items-center justify-between p-4 border border-success rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Chat With Us</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Call Us */}
            <button
              onClick={() => setSelectedSupportOption("Call")}
              className="w-full flex items-center justify-between p-4 bg-purple-50 border border-success rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Call Us</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Email Us */}
            <button
              onClick={() => setSelectedSupportOption("Email")}
              className="w-full flex items-center justify-between p-4 border border-success rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Email Us</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Container - Content Panel */}
      <div className="lg:w-1/2 mt-6 lg:mt-0">
        {selectedSupportOption === "FAQs" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  What is Bridge?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Eu dignissim
                  suspendisse sit aliquet. Ultrices quis sed dui ipsum sodales.
                  Faucibus mauris auctor ut at senean at sed gravida. Dignissim
                  nunc adipiscing vestibulum integer feugiat.
                </p>
              </div>

              <div className="space-y-3">
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100"
                  >
                    <span className="text-purple-600 font-medium text-sm">
                      Why do I need to setup an account on Bridge
                    </span>
                    <button className="text-purple-600 hover:text-purple-700 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!selectedSupportOption && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex items-center justify-center">
            <p className="text-gray-400">
              Select a support option to view details
            </p>
          </div>
        )}

        {selectedSupportOption && selectedSupportOption !== "FAQs" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex items-center justify-center">
            <p className="text-gray-400">
              Content for {selectedSupportOption} coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
