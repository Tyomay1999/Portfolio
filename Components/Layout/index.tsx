import {FC, useMemo} from "react";
import {InterfaceLayoutContainerProps, InterfaceMemorizeLayout, TypeAppPropsWithLayout} from "../../Types/core";
import MainLayout from "./mainLayout";

const MemorizeLayout: FC<InterfaceMemorizeLayout> = ({route,children: page}) => {
    return useMemo(() => {
        console.log("__Render__")
        return page
    },[route])
}

const LayoutContainer: FC<InterfaceLayoutContainerProps> = ({route = null, page, Layout}) => (
    route === null ?
        <Layout>{page}</Layout>
        : <MemorizeLayout route={route}>
            <Layout>{page}</Layout>
        </MemorizeLayout>
)


const Layout: FC<{ Component: TypeAppPropsWithLayout['Component'], pageProps: TypeAppPropsWithLayout['pageProps'], route?: string }> = ({
                                                                                                                                            Component,
                                                                                                                                            pageProps,
                                                                                                                                            route
                                                                                                                                        }) => {
    const getLayout = Component.getLayout ?? ((page) => {
        return <LayoutContainer route={route} page={page} Layout={MainLayout}  />
    })

    return getLayout(<Component {...pageProps} />)
}

export default Layout