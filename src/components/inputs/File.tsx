import React, { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import TextInput from "./Text";

type Props = {
  className?: string;
  name?: string;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  preview?: boolean;
  value?: File;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FileInput({
  value,
  onChange,
  name,
  disabled,
  readOnly,
  label,
  className = "",
  preview
}: Props) {
  const [filePreview, setFilePreview] = useState("");
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (preview && value) {
      setFilePreview(URL.createObjectURL(value));
    }
  }, [preview, value]);

  const onClick = () => {
    document.getElementById(name || "")?.click();
  };

  const removeFile = () => {
    setRemoved(true);
    setFilePreview("");
  };

  useEffect(() => {
    if (value) setRemoved(false);
  }, [value]);

  return (
    <div className={`${className}`}>
      <div className="w-full relative">
        <TextInput
          type="file"
          accept="image/png, image/jpeg"
          name={name}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          label={label}
          className="file-input"
        />
        {!removed && value?.name && (
          <div className="absolute bottom-1 w-[calc(100%-110px)] left-[105px] flex items-center">
            <p
              onClick={onClick}
              className="flex-1 py-2.5 bg-inputBg h-10 line-clamp-1 whitespace-nowrap cursor-default pr-8"
            >
              {value?.name}
            </p>
            <button
              type="button"
              onClick={removeFile}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
              title="Remove file"
            >
              <AiOutlineClose className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        )}
      </div>
      {preview && value && (
        <div className="mt-2 px-10">
          <picture>
            <img src={filePreview} alt="" className="w-full h-auto" />
          </picture>
        </div>
      )}
    </div>
  );
}

export default FileInput;
