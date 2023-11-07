import './Posters.css';
import './App.css';
import Thumbnail from './Thumbnail';
import { useEffect, useState } from 'react';

function Posters() {
    const [activePoster, setActivePoster] = useState(1)
    const [thumbnails, setThumbnails] = useState([])
    const [firstThumb, setFirstThumb] = useState(0)

    useEffect(() => {
        load(firstThumb)
    }, [firstThumb]);

    function load(a) {
        setThumbnails([])

        for (let i = 1; i < 17; i++) {
            if((i+a) < 27) {
                setThumbnails(prevState => [...prevState, (<Thumbnail key={i+a} id={i+a} handleClick={activate}/>)])
            } else {
                setThumbnails(prevState => [...prevState, (<Thumbnail key={i+a-26} id={i+a-26} handleClick={activate}/>)])
            }
        }
    }

    function nextFirst() {
        if(firstThumb-1 < 0) {
            setFirstThumb(26)
        } else {
            setFirstThumb(prevState => prevState-1)
        }
    }

    function nextLast() {
        if(firstThumb+1 > 26) {
            setFirstThumb(0)
        } else {
            setFirstThumb(prevState => prevState+1)
        }
    }

    function activate(a) {
        setActivePoster(a)
    }

    return (
        <div className='Posters'>
            <img src={require(`./images/posters/p${activePoster}.png`)} className='Active-Poster-bg'/>
            <div className='Active-Poster'>
                <img src={require(`./images/posters/p${activePoster}.png`)} className='Active-Poster-img'/>
            </div>
            <div className='Thumbnails'>
                <button onClick={nextFirst}>{"<"}</button>
                {thumbnails}
                <button onClick={nextLast}>{">"}</button>
            </div>
        </div>
    );
}

export default Posters