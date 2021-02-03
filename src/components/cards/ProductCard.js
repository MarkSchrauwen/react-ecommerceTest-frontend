import React, {useState} from 'react';
import {Card, Tooltip} from 'antd';
import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import defaultlaptop from '../../images/defaultlaptop.jfif';
import {Link} from 'react-router-dom';
import {showAverage} from '../../functions/rating';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';

const {Meta} = Card;

const ProductCard = ({product}) => {
    const [tooltip, setTooltip] = useState("Click to add");
    const {user, selector} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        let cart = [];
        if(typeof window !== undefined) {
            if(localStorage.getItem('cart')) {
                cart=JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({...product, count: 1});
            let unique = _.uniqBy(cart, '_id')
            localStorage.setItem('cart', JSON.stringify(unique));
            setTooltip("Added");
            dispatch({
                type:"ADD_TO_CART",
                payload: unique,
            })
            dispatch({
                type:"SET_VISIBLE",
                payload: true,
            })
        }
    }

    const {title, description, images, slug, price} = product
    return(
        <>
                {product && product.ratings && product.ratings.length > 0 
                    ? (showAverage(product)) 
                    : (<div className="text-center pt-1 pb-3">
                        No rating yet
                    </div>)}
                <Card
                    cover={
                        <img src={images && images.length ? images[0].url : defaultlaptop} 
                            style={{height: '150px', objectFit: 'cover'}}
                            className="p-1"            
                        /> }
                    actions={[<Link to={`/product/${slug}`} >
                            <EyeOutlined className="text-warning" /><br />View Product
                        </Link>, 
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                                <ShoppingCartOutlined className="text-danger" /><br />{product.quantity < 1 ? "Out of stock" : "Add to cart"}
                            </a>
                        </Tooltip>
                        ]}    
                >       
                    <Meta title={`EUR ${price} - ${title}`}description={`${description && description.substr(0, 40)}...`} />
                </Card>
        </>
        )
}

export default ProductCard;