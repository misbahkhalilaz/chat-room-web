import React from 'react';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    icon: React.ReactNode;
}
export const IconButton: React.FC<IconButtonProps> = ({icon, type = 'button', ...props}) => {
    return (
        <button className="icon-button" type={type} {...props}>
            {icon}
        </button>
    );
};
