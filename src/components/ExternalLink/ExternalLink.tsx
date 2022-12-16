import React from 'react';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    t?: string;
}

export const LocalizedExternalLink: React.FC<IProps> = ({href, children, ...props}) => {
    return (
        <a href={href || '#!'} target="_blank" rel="noreferrer" {...props}>
            {children}
        </a>
    );
};
