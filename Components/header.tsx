import React, {useState} from 'react'
import headerStyle from '../styles/Components/header.module.scss'
import Link from "next/link";

const Header = () => {
    const [menuIsOpen,openMenu] = useState<boolean>(false)

    return  <header className={ headerStyle.main }>
        <input type="checkbox" name="" id="toggle" className={ headerStyle.toggler }/>
        <label htmlFor="toggle" className='bi bi-list'/>

        <Link href="/">
            <div className={ headerStyle.logo }>
                <h1>Artyom</h1>
            </div>
        </Link>

        <nav className={ headerStyle.navbar }>
            <Link href="/#greetings">About me</Link>
            <Link href="/#about">Education</Link>
            <Link href="/all-flowers">Skills</Link>
            <Link href="/#newProducts">Experience</Link>
            <Link href="/#contact">Projects</Link>
            <Link href="/#contact">Contact me</Link>
        </nav>
        <div className={ headerStyle.icons }>
        </div>
    </header>
}

export default Header