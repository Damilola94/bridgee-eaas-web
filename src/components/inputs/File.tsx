import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import TextInput from "./Text";

type Props = {
  className?: string;
  name?: string;
  accept?: string;
  capture?: string;
  label?: string;
  required?: boolean;
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
  capture,
  disabled,
  readOnly,
  label,
  accept,
  required,
  className = "",
  preview,
}: Props) {
  const [filePreview, setFilePreview] = useState("");
  const [removed, setRemoved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preview && value) {
      const url = URL.createObjectURL(value);
      setFilePreview(url);
    }
  }, [preview, value]);

  const onClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setRemoved(true);
    setFilePreview("");

    if (onChange) {
      const emptyEvent = {
        target: {
          name,
          value: null,
          files: null,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange(emptyEvent);
    }

    if (inputRef.current) {
      inputRef.current.value = ""; // clear file input so same file can be selected again
    }
  };

  useEffect(() => {
    if (value) setRemoved(false);
  }, [value]);

  const displayLabel =
    required && label ? (
      <>
        {label} <span className="text-red-600 text-sm">&nbsp;(required)</span>
      </>
    ) : (
      label
    );

  return (
    <div className={className}>
      <div className="w-full relative">
        <TextInput
          ref={inputRef}
          type="file"
          accept={accept}
          capture={capture}
          name={name}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          label={displayLabel as unknown as string}
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

      {preview && value && !removed && (
        <div className="mt-2 px-10">
          <button
            type="button"
            className="text-blue-600 underline text-sm"
            onClick={() => window.open(filePreview, "_blank")}
          >
            View uploaded PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default FileInput;
