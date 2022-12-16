import React, {FC} from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox: FC<IProps> = React.forwardRef<HTMLInputElement, IProps>(
    ({label, ...props}, ref): JSX.Element => {
        const id = btoa(`${Math.random()}`);

        return (
            <div className="localized-checkbox">
                <input ref={ref} id={id} type="checkbox" {...props} />
                <label htmlFor={id}>{label}</label>
            </div>
        );
    },
);
