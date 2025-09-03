import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import Image from "next/image";

import AlatLogo from "../../../assets/images/alat-logo.png";
import Button from "../../inputs/Button";
import TextInput from "../../inputs/Text";
import PhoneNumberInput from "../../inputs/PhoneNumberInput";
import { useAccountsContext } from "../../../context/Accounts";
import Loading from "../../common/Loading";
import { updateBusinessDetails } from "../../../services/api/business";
import { BusinessDetailsUpdateResponse } from "../../../types/business";
import notification from "../../../utilities/notification";
import { removeNigerianCountryCodeAddLeadingZero } from "../../../utilities/general"; // Assuming renamed to this
import { QUERY_KEYS } from "../../../configs/constants"; // Assuming created

function BusinessDetails() {
  const { accounts } = useAccountsContext();
  const queryClient = useQueryClient();

  const businessDetail = accounts?.identity?.businessDetail || {};
  const isLoading = !accounts;

  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    logoFile: null as File | null
  });

  const [countryCode, setCountryCode] = useState("NG");
  const [phoneWithoutCode, setPhoneWithoutCode] = useState("");

  // Initialize form and phone states
  useEffect(() => {
    if (businessDetail) {
      const phoneNumberString = businessDetail.businessPhone || "";
      const initialCountryCode = phoneNumberString.startsWith("234")
        ? "NG"
        : phoneNumberString.slice(0, 3) || "NG";
      const initialPhoneWithoutCode = phoneNumberString.replace(/^234/, "") || "";

      setFormData({
        businessName: businessDetail.businessName || '',
        businessEmail: businessDetail.businessEmail || '',
        businessPhone: removeNigerianCountryCodeAddLeadingZero(phoneNumberString),
        logoFile: null
      });

      setCountryCode(initialCountryCode);
      setPhoneWithoutCode(initialPhoneWithoutCode);
    }
  }, [businessDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneWithoutCode(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, logoFile: e.target.files[0] });
    }
  };

  const updateMutation = useMutation(updateBusinessDetails, {
    onSuccess: (res: BusinessDetailsUpdateResponse) => {
      if (res.isSuccess) {
        notification({
          message: res.message || "Business details updated successfully!",
          type: "success"
        });
        queryClient.invalidateQueries(QUERY_KEYS.IDENTITY_ACCOUNTS);
      } else {
        notification({
          message: res.message || "Update failed",
          type: "danger"
        });
      }
    },
    onError: (error: any) => {
      notification({
        message: error?.message || "Update failed",
        type: "danger"
      });
    }
  });

  const handleSave = () => {
    if (!formData.businessName || !formData.businessEmail || !phoneWithoutCode) {
      notification({ message: "Please fill in all fields", type: "warning" });
      return;
    }

    const fullPhone = countryCode === "NG" ? `234${phoneWithoutCode}` : `${countryCode}${phoneWithoutCode}`;
    const formattedPhone = removeNigerianCountryCodeAddLeadingZero(fullPhone);

    updateMutation.mutate({
      ...formData,
      businessPhone: formattedPhone
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">Business Details</h2>
            <Button className="border border-success text-success bg-transparent">
              Upgrade Account
            </Button>
          </div>

          <div className="w-full">
            <div className="flex flex-wrap items-end -mx-2">
              <div className="w-full px-2">
                <div className="mb-10">
                  <Image
                    src={formData.logoFile ? URL.createObjectURL(formData.logoFile) : businessDetail?.businessLogoUrl || AlatLogo}
                    alt="business logo"
                    className="w-[100px] h-[100px] bg-gray-300 rounded-full object-cover object-center"
                    width={100}
                    height={100}
                  />
                  <input
                    type="file"
                    id="logo-file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex items-end mt-3">
                    Business Logo
                    <button type="button" className="ml-2"
                      onClick={() => document.getElementById('logo-file')?.click()}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.1902 22H3.19019C2.78019 22 2.44019 21.66 2.44019 21.25C2.44019 20.84 2.78019 20.5 3.19019 20.5H21.1902C21.6002 20.5 21.9402 20.84 21.9402 21.25C21.9402 21.66 21.6002 22 21.1902 22Z"
                          fill="#CE18DF"
                        />
                        <path
                          d="M19.2103 3.48C17.2703 1.54 15.3703 1.49 13.3803 3.48L12.1703 4.69C12.0703 4.79 12.0303 4.95 12.0703 5.09C12.8303 7.74 14.9503 9.86 17.6003 10.62C17.6403 10.63 17.6803 10.64 17.7203 10.64C17.8303 10.64 17.9303 10.6 18.0103 10.52L19.2103 9.31C20.2003 8.33 20.6803 7.38 20.6803 6.42C20.6903 5.43 20.2103 4.47 19.2103 3.48Z"
                          fill="#CE18DF"
                        />
                        <path
                          d="M15.8003 11.53C15.5103 11.39 15.2303 11.25 14.9603 11.09C14.7403 10.96 14.5303 10.82 14.3203 10.67C14.1503 10.56 13.9503 10.4 13.7603 10.24C13.7403 10.23 13.6703 10.17 13.5903 10.09C13.2603 9.81 12.8903 9.45 12.5603 9.05C12.5303 9.03 12.4803 8.96 12.4103 8.87C12.3103 8.75 12.1403 8.55 11.9903 8.32C11.8703 8.17 11.7303 7.95 11.6003 7.73C11.4403 7.46 11.3003 7.19 11.1603 6.91C11.1391 6.86461 11.1186 6.81944 11.0987 6.77454C10.9511 6.44122 10.5165 6.34378 10.2587 6.60153L4.53026 12.33C4.40026 12.46 4.28026 12.71 4.25026 12.88L3.71026 16.71C3.61026 17.39 3.80026 18.03 4.22026 18.46C4.58026 18.81 5.08026 19 5.62026 19C5.74026 19 5.86026 18.99 5.98026 18.97L9.82026 18.43C10.0003 18.4 10.2503 18.28 10.3703 18.15L16.0916 12.4287C16.3511 12.1691 16.2532 11.7237 15.9156 11.5796C15.8776 11.5634 15.8392 11.5469 15.8003 11.53Z"
                          fill="#CE18DF"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <TextInput
                  name="businessName"
                  value={formData.businessName}
                  className="w-full mb-5"
                  label="Business name"
                  placeholder="Business name"
                  onChange={handleChange}
                />

                <PhoneNumberInput
                  countryCode={countryCode}
                  onCountryCodeChange={handleCountryCodeChange}
                  phoneNumber={phoneWithoutCode}
                  onPhoneNumberChange={handlePhoneNumberChange}
                  className="w-full mb-5"
                  label="Phone Number"
                  placeholder="Phone Number"
                />

                <TextInput
                  name="businessEmail"
                  value={formData.businessEmail}
                  className="w-full mb-5"
                  label="Business email"
                  placeholder="Business email"
                  onChange={handleChange}
                  type="email"
                />
              </div>
            </div>
          </div>

          <Button
            className="bg-success py-3 w-full mt-12"
            onClick={handleSave}
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default BusinessDetails;
