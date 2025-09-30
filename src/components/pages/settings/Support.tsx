import { useState } from "react";
import { faqs } from "../../../data/faqs";

export default function Support() {
  const [selectedSupportOption, setSelectedSupportOption] = useState<
    string | null
  >(null);
  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set());

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
                  : "border border-success hover:bg-success hover:text-white"
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
                    className={`w-8 h-8 ${
                      selectedSupportOption === "FAQs"
                        ? "text-success bg-white rounded-lg"
                        : "text-purple-600"
                    }`}
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="10" fill="none" />
                    <path
                      d="M25 26.9297H21L16.55 29.8897C15.89 30.3297 15 29.8598 15 29.0598V26.9297C12 26.9297 10 24.9297 10 21.9297V15.9297C10 12.9297 12 10.9297 15 10.9297H25C28 10.9297 30 12.9297 30 15.9297V21.9297C30 24.9297 28 26.9297 25 26.9297Z"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.9998 19.8594V19.6494C19.9998 18.9694 20.4198 18.6094 20.8398 18.3194C21.2498 18.0394 21.6598 17.6794 21.6598 17.0194C21.6598 16.0994 20.9198 15.3594 19.9998 15.3594C19.0798 15.3594 18.3398 16.0994 18.3398 17.0194"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.9955 22.25H20.0045"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">FAQs</span>
              </div>
              <svg
                className={`w-5 h-5 transition-colors ${
                  selectedSupportOption === "FAQs"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
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
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors group ${
                selectedSupportOption === "Chat"
                  ? "bg-success text-white"
                  : "border border-success hover:bg-success hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center ${
                    selectedSupportOption === "Chat"
                      ? "bg-white bg-opacity-20"
                      : "bg-purple-100"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      selectedSupportOption === "Chat"
                        ? "text-success bg-white rounded-lg"
                        : "text-purple-600"
                    }`}
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="10" fill="none" />
                    <path
                      d="M25 17.5C25 21.37 21.64 24.5 17.5 24.5L16.57 25.62L16.02 26.28C15.55 26.84 14.65 26.72 14.34 26.05L13 23.1C11.18 21.82 10 19.79 10 17.5C10 13.63 13.36 10.5 17.5 10.5C20.52 10.5 23.13 12.17 24.3 14.57C24.75 15.46 25 16.45 25 17.5Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M30.0003 21.3603C30.0003 23.6503 28.8203 25.6803 27.0003 26.9603L25.6603 29.9103C25.3503 30.5803 24.4503 30.7103 23.9803 30.1403L22.5003 28.3603C20.0803 28.3603 17.9203 27.2903 16.5703 25.6203L17.5003 24.5003C21.6403 24.5003 25.0003 21.3703 25.0003 17.5003C25.0003 16.4503 24.7503 15.4603 24.3003 14.5703C27.5703 15.3203 30.0003 18.0803 30.0003 21.3603Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 17.5H20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">Chat With Us</span>
              </div>
              <svg
                className={`w-5 h-5 transition-colors ${
                  selectedSupportOption === "Chat"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
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

            {/* Call Us */}
            <button
              onClick={() => setSelectedSupportOption("Call")}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors group ${
                selectedSupportOption === "Call"
                  ? "bg-success text-white"
                  : "border border-success hover:bg-success hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedSupportOption === "Call"
                      ? "bg-white bg-opacity-20"
                      : "bg-purple-100"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      selectedSupportOption === "Call"
                        ? "text-success bg-white rounded-lg"
                        : "text-purple-600"
                    }`}
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="10" fill="none" />
                    <path
                      d="M29.4309 26.8691C29.4309 27.2291 29.3509 27.5991 29.1809 27.9591C29.0109 28.3191 28.7909 28.6591 28.5009 28.9791C28.0109 29.5191 27.4709 29.9091 26.8609 30.1591C26.2609 30.4091 25.6109 30.5391 24.9109 30.5391C23.8909 30.5391 22.8009 30.2991 21.6509 29.8091C20.5009 29.3191 19.3509 28.6591 18.2109 27.8291C17.0609 26.9891 15.9709 26.0591 14.9309 25.0291C13.9009 23.9891 12.9709 22.8991 12.1409 21.7591C11.3209 20.6191 10.6609 19.4791 10.1809 18.3491C9.70094 17.2091 9.46094 16.1191 9.46094 15.0791C9.46094 14.3991 9.58094 13.7491 9.82094 13.1491C10.0609 12.5391 10.4409 11.9791 10.9709 11.4791C11.6109 10.8491 12.3109 10.5391 13.0509 10.5391C13.3309 10.5391 13.6109 10.5991 13.8609 10.7191C14.1209 10.8391 14.3509 11.0191 14.5309 11.2791L16.8509 14.5491C17.0309 14.7991 17.1609 15.0291 17.2509 15.2491C17.3409 15.4591 17.3909 15.6691 17.3909 15.8591C17.3909 16.0991 17.3209 16.3391 17.1809 16.5691C17.0509 16.7991 16.8609 17.0391 16.6209 17.2791L15.8609 18.0691C15.7509 18.1791 15.7009 18.3091 15.7009 18.4691C15.7009 18.5491 15.7109 18.6191 15.7309 18.6991C15.7609 18.7791 15.7909 18.8391 15.8109 18.8991C15.9909 19.2291 16.3009 19.6591 16.7409 20.1791C17.1909 20.6991 17.6709 21.2291 18.1909 21.7591C18.7309 22.2891 19.2509 22.7791 19.7809 23.2291C20.3009 23.6691 20.7309 23.9691 21.0709 24.1491C21.1209 24.1691 21.1809 24.1991 21.2509 24.2291C21.3309 24.2591 21.4109 24.2691 21.5009 24.2691C21.6709 24.2691 21.8009 24.2091 21.9109 24.0991L22.6709 23.3491C22.9209 23.0991 23.1609 22.9091 23.3909 22.7891C23.6209 22.6491 23.8509 22.5791 24.1009 22.5791C24.2909 22.5791 24.4909 22.6191 24.7109 22.7091C24.9309 22.7991 25.1609 22.9291 25.4109 23.0991L28.7209 25.4491C28.9809 25.6291 29.1609 25.8391 29.2709 26.0891C29.3709 26.3391 29.4309 26.5891 29.4309 26.8691Z"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M25.9609 17.5391C25.9609 16.9391 25.4909 16.0191 24.7909 15.2691C24.1509 14.5791 23.3009 14.0391 22.4609 14.0391"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M29.4609 17.5391C29.4609 13.6691 26.3309 10.5391 22.4609 10.5391"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">Call Us</span>
              </div>
              <svg
                className={`w-5 h-5 transition-colors ${
                  selectedSupportOption === "Call"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
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

            {/* Email Us */}
            <button
              onClick={() => setSelectedSupportOption("Email")}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors group ${
                selectedSupportOption === "Email"
                  ? "bg-success text-white"
                  : "border border-success hover:bg-success hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedSupportOption === "Email"
                      ? "bg-white bg-opacity-20"
                      : "bg-purple-100"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      selectedSupportOption === "Email"
                        ? "text-success bg-white rounded-lg"
                        : "text-purple-600"
                    }`}
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="37" height="37" rx="10" fill="none" />
                    <path
                      d="M19 8.5V15.5L21 13.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 15.5L17 13.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.98047 19.5H13.3905C13.7705 19.5 14.1105 19.71 14.2805 20.05L15.4505 22.39C15.7905 23.07 16.4805 23.5 17.2405 23.5H20.7705C21.5305 23.5 22.2205 23.07 22.5605 22.39L23.7305 20.05C23.9005 19.71 24.2505 19.5 24.6205 19.5H28.9805"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 10.6289C10.46 11.1489 9 13.2289 9 17.4989V21.4989C9 26.4989 11 28.4989 16 28.4989H22C27 28.4989 29 26.4989 29 21.4989V17.4989C29 13.2289 27.54 11.1489 24 10.6289"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">Email Us</span>
              </div>
              <svg
                className={`w-5 h-5 transition-colors ${
                  selectedSupportOption === "Email"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
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
          </div>
        </div>
      </div>

      {/* Right Container - Content Panel */}
      <div className="lg:w-1/2 mt-6 lg:mt-0">
        {selectedSupportOption === "FAQs" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-purple-600 mb-2">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isExpanded = expandedFaqs.has(index);
                  return (
                    <div key={index} className="border-b border-gray-100 pb-3">
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedFaqs);
                          if (newExpanded.has(index)) {
                            newExpanded.delete(index);
                          } else {
                            newExpanded.add(index);
                          }
                          setExpandedFaqs(newExpanded);
                        }}
                        className="w-full flex items-center justify-between py-3 text-left"
                      >
                        <span className="text-purple-600 font-medium text-sm">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-purple-600"
                          >
                            <path
                              d="M6 12H18"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-purple-600"
                          >
                            <path
                              d="M6 12H18"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 18V6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                      {isExpanded && (
                        <p className="text-gray-600 text-sm leading-relaxed mt-2">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
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
