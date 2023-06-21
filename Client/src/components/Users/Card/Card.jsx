import Cardd from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../storeStyles.css'; 

const Card = (props) => {
    return (
        props.isActive === true &&
        <div className={props.stock === 0 ? 'storeComponent storeComponentOutOfStock' :'storeComponent storeComponentCard'}>
            <Cardd className={props.stock === 0 && 'pointer-events-none '}>
                <Link to={props.stock === 0 ? "" : `/${props.id}`} className='customLink'>
                <img src={props.image} alt={props.name} title={props.name} className='mx-auto'/>
                <h2 className='mt-4 text-2xl'>{props.name}</h2>
                <h3 className='text-wwbrown'>${props.price}</h3>
                {props.stock === 0 ? <p>Sin stock!</p> : ""}
                </Link>
            </Cardd>
        </div>

    );
}

export default Card;