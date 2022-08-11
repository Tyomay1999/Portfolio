import {FC, ReactElement, useEffect} from "react";
import {InterfaceHeadProps} from "../../Types/global";
import Head from 'next/head'
import Header from "../header";
import AboutMe from "../aboutMe";
import Education from "../education";
import Skills from "../skills";
import Experience from "../experience";
import Projects from "../projects";
import ContactMe from "../contactMe";

const MainLayout: FC<{children: ReactElement<{head?: InterfaceHeadProps}>}> = ({children: mainContent}) => {
    const headProps = mainContent.props.head
    useEffect(() => {
        console.log("Render mainLayout", mainContent)
    })

    return (
        <>
            {
                headProps && <Head>
                    <title>{headProps.title}</title>
                    <meta name="description" content={headProps.description} />
                </Head>
            }
                <Header />
            <div className="app">
                <AboutMe />
                <Education />
                <Skills />
                <Experience />
                <Projects />
                <ContactMe />
            </div>
        </>
    )

}


export default MainLayout