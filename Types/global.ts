import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import {ReactElement} from "react";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactElement
}

export interface InterfaceHeadProps {
    title: string;
    description: string
}

export type TypeGetStaticPropsSEO<T = unknown> = GetStaticProps<{ head: InterfaceHeadProps } & T>
export type TypeGetServerSidePropsSEO< T = unknown > = GetServerSideProps<{ head: InterfaceHeadProps } & T>