import React from "react";
import styled from '@emotion/styled';

const StyledDiv: any = styled('div')`
        @media screen and (min-width: 992px) {
            width: ${(props: any) => (100 / 12 * (props.lg || props.md || props.sx)) + "%"};
        }

        @media screen and (max-width: 991px) {
            width: ${(props: any) => (100 / 12 * (props.md || props.sx)) + "%"};            
        }

        @media screen and (max-width: 576px) {
            width: ${(props: any) => (100 / 12 * props.sx) + "%"};
        }
`;

interface IProps {
    sx?: number;
    md?: number;
    lg?: number;
    children?: JSX.Element | JSX.Element[]
}

export const Col: React.FC<IProps> = ({ sx, md, lg, children }) => {
    return (
        <>
            <StyledDiv sx={sx} md={md} lg={lg}>{children}</StyledDiv>
        </>
    )
}
