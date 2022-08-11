import {AppProps} from "next/app";
import {NextPageWithLayout} from "./global";
import {FC, ReactElement} from "react";

export type TypeAppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export interface InterfaceLayoutContainerProps {
    page: ReactElement;
    Layout: FC<{ children: ReactElement }>;
    route?: string | null;
}


export interface InterfaceMemorizeLayout {
    route: string;
    children: InterfaceLayoutContainerProps['page'];
}
