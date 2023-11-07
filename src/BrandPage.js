import './App.css';
import BrandExample from './BrandExample';
import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BrandPage({props}) {

  const { productId } = useParams();

  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(props[productId].examples.map((card) => <BrandExample key={card.id} name={props[productId].name} props={card} handleClick={activateText}/>))
  }, []);

  function activateText(a) {
    setHeader(a.header)
    setText(a.text)
  }
  
  return (
    <div className="Brand-Page">
        <div className='Brand-Examples'>
          {cards}
        </div>

        <div className='Brand-Text'>
          <div className='Text-Body Brand-Page-Text'>
            <h1>{header}</h1>
            <div dangerouslySetInnerHTML={ {__html: text} } />
          </div>
        </div>
    </div>
  );
}

export default BrandPage;