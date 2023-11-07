import { useState, useEffect } from 'react';

function BrandCard({props, handleClick}) {
    const [image, setImage] = useState("");

    useEffect(() => {
        let img = require(`./images/${props.name}.png`)
        setImage(img)
    }, []);

    function handle() {
        handleClick(props)
    }

    return (
        <div className='Card'>
          <img src={image} onMouseEnter={handle}/>
        </div>
    );
}

export default BrandCard
