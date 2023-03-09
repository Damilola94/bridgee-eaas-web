import React from 'react';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

type Props = {
  className?: string,
  value?: string,
  name?: string,
  label?: string,
  placeholder?: string,
  onChange?: React.Dispatch<React.SetStateAction<string>>,
};

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

function Editor({
  onChange = () => {}, name, value, className, label, placeholder
}: Props) {
  return (
    <div className={`${className} editor-container`}>
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
      </label>

      <ReactQuill
        id={name}
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

Editor.defaultProps = {
  className: '',
  onChange: () => { },
  value: '',
  label: '',
  name: ''
};

export default Editor;

