import BrandCard from './BrandCard';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function BrandIdentity() {
  const [brands, setBrands] = useState([]);
  const [brandCards, setBrandCards] = useState([]);
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  const [classVar, setClassVar] = useState("Brand-Text");

  function activateText(a) {
    setHeader(a.header)
    setText(a.text)

    setClassVar(`${a.name} Brand-Text`)
  }

  useEffect(() => {
    let data = require('./brands.json')
    setBrands(data.data)
  }, []);

  useEffect(() => {
    setBrandCards(brands.map((brand) => <Link to={"/brand/" + brand.id} ><BrandCard key={brand.id} props={brand} handleClick={activateText}/></Link>))
  }, [brands]);

  return (
    <div className="Brand-Identity">
        <div className='Brand-Cards'>
            {brandCards}
        </div>
        <div className={classVar}>
          <div className='Text-Body'>
            <h1>{header}</h1>
            <div dangerouslySetInnerHTML={ {__html: text} } />
          </div>
        </div>
    </div>
  );
}

export default BrandIdentity;
