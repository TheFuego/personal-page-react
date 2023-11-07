import './Posters.css';
import './App.css';

function Thumbnail({id, handleClick}) {
    return (
        <div className='Thumbnail'>
            <img src={require(`./images/posters/thumbs/p${id}.jpg`)} onClick={function() {handleClick(id)}} className='Thumbnail'/>
        </div>
    );
}

export default Thumbnail