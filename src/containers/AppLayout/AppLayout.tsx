import Link from 'next/link';
import React, {ReactNode} from 'react';

interface IProps {
    bannerContent: ReactNode;
    className?: string;
}

export const AppLayout: React.FC<IProps> = ({children, className}) => {
    return (
        <main className={`app-layout ${className}`}>
            <header>
                <div>
                    <Link href={'/'}>
                        <a>
                            {/* logo here */}
                        </a>
                    </Link>
                </div>
            </header>
            <section className="app-layout__content">{children}</section>
        </main>
    );
};
