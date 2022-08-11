import '../styles/index.scss';

import {TypeAppPropsWithLayout} from "../Types/core";
import Layout from "../Components/Layout";

function MyApp({ Component, pageProps, router: {route} }: TypeAppPropsWithLayout) {

  return <div>
    <Layout Component={Component} pageProps={pageProps} route={route} />
  </div>
}

export default MyApp
