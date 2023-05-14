import {FunctionComponent} from "react";

type MainLayoutProps = {
    children : JSX.Element
}

export const MainLayout : FunctionComponent<MainLayoutProps> = ({children}) => {
    return (
        <>
            <div>{children}</div>
        </>
    );
};