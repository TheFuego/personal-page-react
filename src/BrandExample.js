import { useState, useEffect } from 'react';

function BrandExample({name, props, handleClick}) {
    const [img, setImg] = useState(require(`./images/${name}/${props.id}.png`));
    const [img2, setImg2] = useState(require(`./images/${name}/${props.id}u.png`));
    const [image, setImage] = useState("");

    useEffect(() => {
        setImage(img)
    }, []);

    function handle() {
        handleClick(props)
        setImage(img2)
    }

    return (
        <>
          <img src={image} onMouseEnter={handle} onMouseLeave={function() {setImage(img)}} className={`Example-${props.isQuartet}`}/>
        </>
    );
}

export default BrandExample
