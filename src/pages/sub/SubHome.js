import React, {useEffect, useState} from 'react';
import {getSub} from '../../functions/sub';
import ProductCard from '../../components/cards/ProductCard';

const SubHome = ({match}) => {
    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = match.params;

    useEffect(() => {
        setLoading(true);
        getSub(slug)
        .then((res) => {
            setSub(res.data.sub);
            setProducts(res.data.products)
            setLoading(false);
        })
    }, [])
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading ? (
                        <h4 className="text-center jumbotron p-3 mt-5 mb-5 display-4">Loading...</h4>
                    ) : (
                        <h4 className="text-center jumbotron p-3 mt-5 mb-5 display-4">
                            {products.length} products in "{sub.name}" sub category
                        </h4>
                    )}
                </div>
            </div>
            <div className="row">
                {products.map((p) => 
                    <div className="col-md-4" key={p._id}>
                        <ProductCard product={p} />
                    </div>)}
            </div>
        </div>
    )
};

export default SubHome;