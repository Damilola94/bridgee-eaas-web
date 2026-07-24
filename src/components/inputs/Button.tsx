import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

type ButtonProps = {
  children: React.ReactNode,
  className: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  disabled: boolean,
  fontSize: string,
  bgColor: string,
  borderColor: string,
  textColor: string,
  paddingY: string,
  paddingX: string,
  border: boolean,
  type: 'button' | 'submit' | 'reset' | undefined
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: ButtonVariant;
  loading?: boolean;
};

const VARIANT_STYLES: Record<
  ButtonVariant,
  { bgColor: string; textColor: string; borderColor: string; border: boolean }
> = {
  primary: {
    bgColor: 'bg-[#A3195B]',
    textColor: 'text-white',
    borderColor: 'border-[#A3195B]',
    border: false,
  },
  outline: {
    bgColor: 'bg-transparent',
    textColor: 'text-[#A3195B]',
    borderColor: 'border-[#A3195B]',
    border: true,
  },
  ghost: {
    bgColor: 'bg-transparent',
    textColor: 'text-[#A3195B]',
    borderColor: 'border-transparent',
    border: false,
  },
};

function Button({
  children, className, type, onClick, border, borderColor,
  disabled, fontSize, bgColor, textColor, paddingY, paddingX,
  icon, iconPosition = 'left', variant, loading,
}: ButtonProps) {
  // variant, when provided, supplies the color/border preset;
  // explicit bgColor/textColor/borderColor/border props still win if variant is absent.
  const resolved = variant ? VARIANT_STYLES[variant] : null;

  const resolvedBgColor = resolved?.bgColor ?? bgColor;
  const resolvedTextColor = resolved?.textColor ?? textColor;
  const resolvedBorderColor = resolved?.borderColor ?? borderColor;
  const resolvedBorder = resolved?.border ?? border;

  const isDisabled = disabled || loading;

  return (
    <button
      type={type || 'button'}
      className={`${fontSize} ${resolvedBgColor} ${resolvedTextColor} ${paddingX
      } ${paddingY} rounded-lg ${resolvedBorder ? `border ${resolvedBorderColor}` : ''
      } flex justify-center items-center transition-all hover:bg-opacity-70 disabled:border-0 ${className
      } disabled:cursor-not-allowed disabled:bg-opacity-30 disabled:bg-success disabled:text-white`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin mr-2" />
      ) : (
        icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
}

Button.defaultProps = {
  children: 'Button',
  className: '',
  onClick: () => { },
  disabled: false,
  fontSize: 'text-base',
  bgColor: 'bg-success',
  borderColor: 'border-success',
  textColor: 'text-secondary',
  paddingY: 'py-1.5',
  paddingX: 'px-6',
  border: false,
  type: 'button',
  variant: undefined,
  loading: false,
};

export default Button;