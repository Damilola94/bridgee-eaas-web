import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

import { IdFormProps } from "../../../../types/kyc";
import Button from "../../../inputs/Button";

// import TextInput from '../../../inputs/Text';
// import SelectInput from '../../../inputs/Select';
// import { idTypes } from '../../../../data/kyc';
import { useKycContext } from "../../../../context/Kyc";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";
import Loading from "../../../common/Loading";
// import FileInput from '../../../inputs/File';
// import { formatFileUrl, formatIDTypeLabel } from '../../../../utilities/general';
// import { formatIDTypeLabel } from "../../../../utilities/general";

import useFormStage from "../../../../hooks/useFormStage";

import TextInput from "../../../inputs/Text";

// import SuccessMessage from "./SuccessMessage";
import FaceCaptureModal from "./FaceCaptureModal";

const initialFormState: IdFormProps = {
  ninDetails: "",
  personalAccountDocumentType: undefined,
  identificationNumber: "",
  front: undefined,
  back: undefined,
  frontPath: "",
  backPath: ""
};

function IdInfoForm({ setBvn, showCapModal, setShowCapModal }: any) {
  const router = useRouter();
  const { kycData } = useKycContext();
  const formStage = useFormStage();
  const [form, setForm] = useState<IdFormProps>(initialFormState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { idCardInformation } = kycData || {};

  useEffect(() => {
    // setForm({ ninDetails: idCardInformation });
  }, [idCardInformation]);

  const queryClient = useQueryClient();
  const idMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setShowSuccessMessage(!showSuccessMessage);
      // notification({
      //   message: res?.message || "You have successfully updated your KYC",
      //   type: "success"
      // });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const handleChange = (val: any, type = "input", inputName = "") => {
    if (type === "input") {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const validateForm = () => {
    if (!form?.ninDetails) return 'Please, enter your NIN.';
    if (form?.ninDetails?.length !== 11) return 'Please, enter a valid NIN.';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: "Form Error", message: error, type: "danger" });
      return;
    }
    const body = { nin: form?.ninDetails };
    idMutation.mutate({
      endpoint: "user",
      extra: "add-and-validate-nin",
      method: "POST",
      body,
      auth: true
    });
  };

  const handleOpenFaceCapturing = () => {
    setShowSuccessMessage(!showSuccessMessage);
    setShowCapModal(!showCapModal);
    queryClient.invalidateQueries(["user-information"]);
    router.push("/get-started/kyc?step=take-a-selfie-nin");
  };

  const isCompleted = formStage?.kycStatus === "Completed";
  const { isLoading } = idMutation;

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading && <Loading />}
      {showSuccessMessage && <FaceCaptureModal onClose={handleOpenFaceCapturing} title="NIN validated successfully." subTitle=" Start Liveliness Check."/>}
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="mb-5">
            {/* <h2 className="font-bold text-xl mb-2">ID Card Details</h2> */}
            <h2 className="font-bold text-xl mb-2">NIN Details</h2>
            {/* <p className="text-lightText text-sm">
              Please upload any of the following means of identification:
              National Identification, international passport, Voter’s card, Driver’s License.
            </p> */}
            <p className="text-lightText text-sm">
              Please input your NIN number to proceed
            </p>
            <p className="text-sm font-extrabold">Dial *346# on your phone to get the number.</p>
          </div>
          <div className="w-full">
            <TextInput
              name="ninDetails"
              disabled={isCompleted}
              onChange={(e) =>
                /^\d{0,11}$/g.test(e.target.value) && handleChange(e)
              }
              value={form?.ninDetails || ""}
              className="w-full mb-1"
              label="NIN number*"
            />
          </div>
          {/* <div className="w-full">
            <SelectInput
              label="Identification Type"
              className="mb-4"
              disabled={isCompleted}
              value={form?.personalAccountDocumentType || undefined}
              onChange={(val) => handleChange(val, 'select', 'personalAccountDocumentType')}
              options={idTypes || []}
            />
            <TextInput
              name="identificationNumber"
              disabled={isCompleted}
              onChange={handleChange}
              value={form?.identificationNumber || ''}
              className="w-full mb-4"
              label="Identification number"
            />
            <FileInput
              preview
              name="front"
              disabled={isCompleted}
              value={form?.front}
              onChange={handleChange}
              label="Upload ID document (Front)"
              className="file-input w-full mb-4"
            />
            {!form?.front && form?.frontPath && (
              <div className="mb-4 px-10">
                <picture>
                  <img src={formatFileUrl(form.frontPath)} alt="" className="w-full h-auto" />
                </picture>
              </div>
            )}
            <FileInput
              preview
              name="back"
              value={form?.back}
              disabled={isCompleted}
              onChange={handleChange}
              label="Upload ID document (Back)"
              className="file-input w-full mb-4"
            />
            {!form?.back && form?.backPath && (
              <div className="mb-4 px-10">
                <picture>
                  <img src={formatFileUrl(form.backPath)} alt="" className="w-full h-auto" />
                </picture>
              </div>
            )}
          </div> */}
        </div>
      </div>

      <div className="flex mt-5 -mx-2">
        <div className="w-1/2 px-2">
          <Button
            border
            borderColor="border-gray-300"
            bgColor="bg-white"
            textColor="text-black"
            className="w-full"
            paddingY="py-3"
            onClick={() =>
              router.push("/get-started/kyc?step=residential-info")
            }
          >
            Back
          </Button>
        </div>
        {(isCompleted || formStage?.kycStatus === "Pending") && (
          <div className="w-1/2 px-2">
            <Button
              border
              borderColor="border-gray-300"
              bgColor="bg-white"
              textColor="text-black"
              className="w-full"
              paddingY="py-3"
              onClick={() => router.push("/get-started/kyc?step=kyc-completed")}
            >
              Next
            </Button>
          </div>
        )}
        {!isCompleted && (
          <div className="w-1/2 px-2">
            <Button
              className="w-full whitespace-nowrap"
              paddingY="py-3"
              onClick={handleSubmit}
            >
              Save and Continue
            </Button>
          </div>
        )}
      </div>

      {/* {showSuccessMessage && <SuccessMessage onClose={handleCloseSuccessMsg} />} */}
    </div>
  );
}

export default IdInfoForm;
