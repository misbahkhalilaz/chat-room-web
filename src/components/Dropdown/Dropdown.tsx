import classNames from 'classnames';
import React, {FC, ReactNode, useRef, useState} from 'react';

interface IProps {
    head: ReactNode;
    menu: ReactNode;
    className?: string;
    transition?: 'fade' | 'collapse';
    toggle?: boolean;
}

export const Dropdown: FC<IProps> = ({head, menu, transition = 'fade', className = '', toggle = true}) => {
    const [openMenu, setOpenMenu] = useState(false);
    const ref = useRef(null);

    return (
        <a className={classNames('dropdown', className, transition, {open: openMenu})}>
            <button
                className="dropdown__head"
                type="button"
                ref={ref}
                onClick={() => setOpenMenu(toggle ? !openMenu : true)}>
                {head}
            </button>
            <div className={classNames('dropdown__menu', {open: openMenu})}>{menu}</div>
        </a>
    );
};
