import React from 'react';

export const ExternalLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({href, children, ...props}) => {
    return (
        <a href={href || '#!'} target="_blank" rel="noreferrer" {...props}>
            {children}
        </a>
    );
};
