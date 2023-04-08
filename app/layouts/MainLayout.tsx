import {FunctionComponent} from "react";

type MainLayoutProps = {
    children : JSX.Element
}

export const MainLayout : FunctionComponent<MainLayoutProps> = ({children}) => {
    return (
        <>
            <div className="px-10 py-5">{children}</div>
        </>
    );
};