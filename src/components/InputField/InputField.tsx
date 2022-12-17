import classNames from 'classnames';
import React, {forwardRef} from 'react';
import {InputFieldProps} from 'src/types/input';

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({label, message, isError = false, disableLabelTransition = true, ...fieldProps}, ref) => {
        const inputId = `input-${fieldProps.name}`;

        return (
            <div
                className={classNames('input-group', {
                    'input-group--error': isError,
                })}>
                <input {...fieldProps} ref={ref} id={inputId} />
                <label
                    htmlFor={inputId}
                    className={classNames('input-group__label', {
                        'input-group__label--focused': fieldProps.value || disableLabelTransition,
                        'input-group__label--blured': !fieldProps.value || !disableLabelTransition,
                    })}>
                    {label}
                </label>
                {message && (
                    <label htmlFor={inputId} className="input-group__message">
                        {message}
                    </label>
                )}
            </div>
        );
    },
);
