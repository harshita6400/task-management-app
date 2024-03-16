import React from "react";
import './row.scss';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const Row: React.FC<Props> = ({ children }) => {
    return (
        <>
            <div className="row_container" >{children}</div>
        </>
    )
}
