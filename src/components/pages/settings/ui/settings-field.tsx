export function SettingsField({
  label,
  maxLength,
  ...inputProps
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <input
      maxLength={maxLength}
        {...inputProps}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-900"
      />
    </div>
  );
}

export function SettingsTextarea({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-900 resize-none"
      />
    </div>
  );
}

export function SettingsSaveButton({
  disabled,
  children,
}: {
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-[#A3195B] hover:bg-[#8a1650] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-colors"
    >
      {children ?? "Save"}
    </button>
  );
}