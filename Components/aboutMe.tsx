import React from 'react'
import aboutMeStyle from '../styles/Components/aboutMe.module.scss'

const AboutMe = () => {
    return <div className={aboutMeStyle.main}>
        <div className={aboutMeStyle.head}>
            <h1>About <span>Me</span></h1>
        </div>
    </div>
}

export default AboutMe