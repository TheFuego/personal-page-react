import { useState } from 'react';
import './App.css';
import './AboutMe.css';

function AboutMe() {

    const video = <video id="potpis" loop={true} autoPlay="autoplay" muted src={require("./images/aboutme/potpis.mp4")} type="video/mp4"/>
    const name = <h1 id="name-real">Dimitrije Gocić</h1>

    const [sign, setSign] = useState(video)

    function setVideo() {
        setSign(video)
    }

    function setText() {
        setSign(name)
    }

    return (
        <div className="About-Me">
            <div className='Container'>
                <div className='Image'>
                    <img src={require(`./images/aboutme/portrait.jpg`)}/>
                </div>

                <div className='Text'>
                    <div className='Name' onMouseOver={setText} onMouseLeave={setVideo}>{sign}</div>
                    
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    
                    <div className='Social-Media'>
                        <a href="https://www.instagram.com/fuego.design1/" target="_blank"><img src={require(`./images/aboutme/insta.png`)}/></a>
                        <a href="mailto: thefuegolord126@gmail.com" target="_blank"><img src={require(`./images/aboutme/mail.png`)}/></a>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default AboutMe;