import React from 'react';

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
};

function Button({
  children, className, type, onClick, border, borderColor,
  disabled, fontSize, bgColor, textColor, paddingY, paddingX, icon, iconPosition = 'left', 
}: ButtonProps) {
  return (
    <button
      type={type || 'button'}
      className={`${fontSize} ${bgColor} ${textColor} ${paddingX
      } ${paddingY} rounded-lg ${border ? `border ${borderColor}` : ''
      } flex justify-center items-center transition-all hover:bg-opacity-70 disabled:border-0 ${className
      } disabled:cursor-default disabled:bg-opacity-30 disabled:bg-success disabled:text-white`}
      disabled={disabled}
      onClick={onClick}
    >
     {icon && iconPosition === 'left' && <span className='mr-2'>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
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
  type: 'button'
};

export default Button;
