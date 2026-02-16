import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', onClick, style }) => {
  return (
    <span 
      className={`material-symbols-outlined select-none ${className}`} 
      onClick={onClick}
      style={style}
    >
      {name}
    </span>
  );
};