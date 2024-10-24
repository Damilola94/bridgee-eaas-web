import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

import Image from "next/image";

import Button from "../../../inputs/Button";

import notification from "../../../../utilities/notification";
import Loading from "../../../common/Loading";
import handleFetch from "../../../../services/api/handleFetch";
import useFormStage from "../../../../hooks/useFormStage";
import Modal from "../../../common/Modal";

import FaceCameraBox from "../FaceCapture/FaceCameraBox";

function SelfieForm({ bvn, showCapModal, setShowCapModal }: any) {
  const router = useRouter();
  const { step } = router?.query || {};
  const formStage = useFormStage();
  const [base64Url, setBase64Url] = useState("");
  const selfieRef = useRef(null);

  const route = step === 'take-a-selfie-nin' ? "residential-info" : "personal-info";

  const queryClient = useQueryClient();
  const selfMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(["user-information"]);
      router.push(`/get-started/kyc?step=${route}`);
      notification({
        message: res?.message || "You have successfully updated your kyc",
        type: "success"
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  let base64ImageString = base64Url.split(',')[1];

  const handleSubmit = () => {
    let body;

    if (step === 'take-a-selfie-nin') {
      body = { base64ImageString };
    } else {
      body = {
        bvn,
        base64ImageString
      };
    }

    const extra = step === 'take-a-selfie-nin' ? "evaluate-nin-selfie" : "evaluate-bvn-selfie";

    selfMutation.mutate({
      endpoint: "user",
      extra,
      method: "POST",
      body,
      auth: true
    });
  };

  const handleCaptureModal = () => {
    setShowCapModal(!showCapModal);
  };

  const isCompleted = formStage?.kycStatus === "Completed";
  const { isLoading } = selfMutation;

  useEffect(() => {
    if (base64Url !== "") {
      handleCaptureModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base64Url]);

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading && <Loading />}
      <Modal
        isOpen={showCapModal}
        onClose={handleCaptureModal}
        // maxWidth="max-w-[300px]"
        noBg
        isShowCloseIcon={false}
      >
        <div className='flex justify-center items-center mt-0s'>
          <FaceCameraBox
            ref={selfieRef}
            setBase64Url = { setBase64Url }
            label=""
            holderShape= ""
            accept=""
            name=""
            disabled
            hasError
            shape="rect"
            onFile={() => {}}
            removeImage={() => {}}
            handleCaptureModal={handleCaptureModal}
          />
        </div>
      </Modal>
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl mb-5">Take a Selfie</h2>
          </div>
          <div className="flex justify-between items-start">
            <ol className="list-disc text-lightText text-sm ml-4 space-y-1 mb-4">
              <li className="">
                Make sure you are in a well-lit area
              </li>
              <li className="">
                Make sure you are in a front of a plain backgroun
              </li>
              <li className="">
                Make sure you remove hats, thick glasses or anything else
              </li>
              <li className="">
                Make sure you keep your expression neutral
              </li>{" "}
              <li className="">
                Make sure to keep your face within the circle
              </li>
            </ol>
          </div>
          <div className="w-full">
            <div className="max-w-xl rounded-lg h-96 w-full bg-gray-300 border-gray-300 border-4">
              {base64Url ? <Image
                priority
                className="mx-auto w-full h-[338px] rounded-lg "
                width={120}
                height={45}
                src={base64Url}
                alt="Selfie Preview"
              /> : ""}
            </div>
          </div>
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
            onClick={handleCaptureModal}
          >
            Try again
          </Button>
        </div>
        {isCompleted ? (
          <div className="w-1/2 px-2">
            <Button
              border
              borderColor="border-gray-300"
              bgColor="bg-white"
              textColor="text-black"
              className="w-full"
              paddingY="py-3"
              onClick={() => router.push("/get-started/kyc?step=personal-info")}
            >
              Next
            </Button>
          </div>
        ) : (
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
    </div>
  );
}

export default SelfieForm;
