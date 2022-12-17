import {DetailedHTMLProps, InputHTMLAttributes} from 'react';

declare interface InputFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    name: string;
    label: string;
    message?: string;
    isError?: boolean;
    disableLabelTransition?: boolean;
}
