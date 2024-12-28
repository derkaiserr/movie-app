import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import  Link  from 'next/link';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
    const navigate = useRouter()
  return (
    <div className='footer'> 
        <div className='footer_logo'>
            <Link href={"https://www.instagram.com/sckokyy/"} target='_blank'> 
                <FaInstagram />
            </Link>
            <Link href={"https://twitter.com/Sckokyy"} target='_blank'>
                <FaXTwitter />
            </Link>
            <Link href={'https://github.com/GbollySckoky'} target='_blank'>
                <IoLogoGithub />
            </Link>
            <Link href={"https://www.linkedin.com/in/gbolahan-coker-85ba39241/"} target='_blank'>
                <FaLinkedin />
            </Link>
        </div>
        <div className='footer_copy'>
            <p> &copy; 2024</p>
             <Link href={'mailto:gbolahancoker99@gmail.com'} target='_blank'>gbolahancoker99@gmail.com</Link>
        </div>
    </div>
  )
}

export default Footer