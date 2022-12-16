import React from 'react';
import {Backdrop} from '../Backdrop/Backdrop';
import {TailSpin} from 'react-loader-spinner';

export const Loader: React.FC = () => {
    return (
        <Backdrop active={true}>
            <div className="loader">
                <TailSpin height={96} width={96} />
            </div>
        </Backdrop>
    );
};
