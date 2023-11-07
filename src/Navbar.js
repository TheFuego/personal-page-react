import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    return (
        <div className='Navbar'>
          <Link to="/"><button>Brand Identity</button></Link>
          <Link to="/posters"><button>Posters</button></Link>
          <Link to="/coding"><button>Coding</button></Link>
          <Link to="/about-me"><button>About Me</button></Link>
          <a href="https://1970-shop.shop.brendly.rs/shop/category/Sve" target="_blank"><button>1970 Shop↗</button></a>
        </div>
    );
}

export default Navbar
