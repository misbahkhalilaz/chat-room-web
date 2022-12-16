import classNames from 'classnames';
import React, {FC, ButtonHTMLAttributes} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'hollow' | 'filled';
    size?: 'small' | 'medium' | 'large';
}
export const Button: FC<Props> = ({
    className,
    variant = 'filled',
    size = 'medium',
    type = 'button',
    children,
    ...props
}) => {
    return (
        <button
            className={classNames(
                className,
                'localized-button',
                `localized-button--${variant}`,
                `localized-button--${size}`,
            )}
            type={type}
            {...props}>
            {children}
        </button>
    );
};
