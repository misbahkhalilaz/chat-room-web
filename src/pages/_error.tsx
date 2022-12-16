import {NextPage} from 'next';
import React from 'react';

interface IProps {
    statusCode: number;
}

const Error: NextPage<IProps> = (props): JSX.Element => {
    return (
        <p>{props.statusCode ? `An error ${props.statusCode} occurred on server` : 'An error occurred on client'}</p>
    );
};

Error.getInitialProps = ({res, err}) => {
    let statusCode = 404;
    if (res) {
        statusCode = res.statusCode;
    } else if (err) {
        statusCode = err.statusCode || 404;
    }
    return {statusCode};
};

export default Error;
