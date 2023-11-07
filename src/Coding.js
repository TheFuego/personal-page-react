import './App.css';
import './Coding.css';

function Coding() {
    return (
        <div className='Coding'>
            <h1>Coding projects:</h1>

            <div className='Icons'>
                <div id="psajt"><a className='Coding--Icon' href="../public/coding/partizan_sajt/index.html" target="_blank"><img src={require(`./images/coding/partizan.png`)}/></a></div>
                <div id="poker"><a className='Coding--Icon' href="../public/coding/poker/index.html" target="_blank"><img src={require(`./images/coding/poker.png`)}/></a></div>
                <div id="slagalica"><a className='Coding--Icon' href="../public/coding/slagalica/index.html" target="_blank"><img src={require(`./images/coding/slagalica.png`)}/></a></div>
                <div id="shoes"><a className='Coding--Icon' href="../public/coding/shoes/index.html" target="_blank"><img src={require(`./images/coding/shoes.png`)}/></a></div>
                <div id="recipe"><a className='Coding--Icon' href="../public/coding/recipes/index.html" target="_blank"><img src={require(`./images/coding/recipe.png`)}/></a></div>
                <div id="fighter"><a className='Coding--Icon' href="../public/coding/fighter/code/index.html" target="_blank"><img src={require(`./images/coding/lug.png`)}/></a></div>
                <div id="table"><a className='Coding--Icon' href="../public/coding/table/index.html" target="_blank"><img src={require(`./images/coding/lug.png`)}/></a></div>
                <div id="resize"><a className='Coding--Icon' href="../public/coding/resize/index.html" target="_blank"><img src={require(`./images/coding/lug.png`)}/></a></div>
                <div id="cards"><a className='Coding--Icon' href="../public/coding/cards/index.html" target="_blank"><img src={require(`./images/coding/lug.png`)}/></a></div>
                <div id="hangman"><a className='Coding--Icon' href="../public/coding/hangman/index.html" target="_blank"><img src={require(`./images/coding/lug.png`)}/></a></div>
                <div id="on-off"><a className='Coding--Icon' href="../public/coding/on-off/index.html" target="_blank"><img src={require(`./images/coding/lug.png`)}/></a></div>
            </div>
        </div>
    );
}

export default Coding