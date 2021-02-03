import React, {useState, useEffect} from 'react';
import {getProductsByCount, fetchProductsByFilter} from '../functions/product';
import {getCategories} from '../functions/category';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import {Menu, Slider, Checkbox, Radio} from 'antd';
import {EuroOutlined, DownSquareOutlined, StarOutlined, CheckOutlined} from '@ant-design/icons';
import Star from '../components/forms/Star';
import { getSubs } from '../functions/sub';

const {SubMenu, ItemGroup} = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [star, setStar] = useState('');
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "Asus","Acer", "HP"]);
    const [brand, setBrand] = useState("");
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");
    const [ok, setOk] = useState(false);

    let {search} = useSelector((state) => ({...state}));
    let dispatch = useDispatch();
    const {text} = search;

    useEffect(() => {
        setLoading(true);
        loadAllProducts();
        getCategories().then(res => setCategories(res.data));
        getSubs().then(res => setSubs(res.data));
    }, [])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg)
        .then((res) => {
            setProducts(res.data)
        });
    };

    // load products by default
    const loadAllProducts = async () => {
        await getProductsByCount(12).then(p => {
            setProducts(p.data);
            setLoading(false)
        });
    };
    // load products based on search
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({query: text});
            if(!text){
                loadAllProducts();
            }
        }, 300)
        return () => clearTimeout(delayed)
    }, [text]);

    // load products based on price range
    useEffect(() => {
        fetchProducts({price});
    }, [ok])

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""},
        })
        setCategoryIds([]);
        setStar("");
        setSub('');
        setBrand('');
        setColor("");
        setShipping("");
        setPrice(value);
        setTimeout(() => {setOk(!ok)}, 300);
    };

    // load products based on categories
    const showCategories = () => categories.map((c) => <div key={c._id}>
            <Checkbox onChange={handleCheck} 
                className="pt-2 pl-4 pr-4" 
                value={c._id}
                checked={categoryIds.includes(c._id)} 
                name="category">
                {c.name}
            </Checkbox>
            <br />
        </div>);
    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""},
        })
        setPrice([0, 0]);
        setStar("");
        setSub("");
        setBrand("");
        setColor("");
        setShipping("");
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);
        if(foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        fetchProducts({category: inTheState})
    };

    // show products by star rating
    const handleStarClick = (num) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""},
        })
        setCategoryIds([]);
        setPrice([0, 0]);
        setSub("");
        setBrand("");
        setColor("");
        setShipping("");
        setStar(num);
        fetchProducts({stars: num});
    }
    const showStars = () => (<div className="pt-2 pl-4 pr-4">
        <Star starClick={handleStarClick} numberOfStars={5} />
        <Star starClick={handleStarClick} numberOfStars={4} />
        <Star starClick={handleStarClick} numberOfStars={3} />
        <Star starClick={handleStarClick} numberOfStars={2} />
        <Star starClick={handleStarClick} numberOfStars={1} />
    </div>);

    // show products by sub category
    const showSubs = () => subs.map((s) => <div className="p-1 m-1 badge badge-secondary" 
        style={{cursor: "pointer"}}
        key={s._id}
        onClick={() => handleSub(s)}>{s.name}</div>);
    const handleSub = ((sub) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""},
        })
        setCategoryIds([]);
        setPrice([0, 0]);
        setStar("");
        setBrand("");
        setColor("");
        setShipping("");
        setSub(sub);
        fetchProducts({sub});

    });

    // show products by brand
    const showBrands = () => brands.map((b) => 
        <div>
            <Radio value={b}
                key={b} 
                name={b} 
                checked={b === brand} 
                onChange={handleBrand}
                className="pb-1 pr-4">
                {b}
            </Radio>
        </div>);
    const handleBrand = ((e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""},
        })
        setCategoryIds([]);
        setPrice([0, 0]);
        setStar("");
        setSub("");
        setColor("");
        setShipping("");
        setBrand(e.target.value);
        fetchProducts({brand: e.target.value});
    })

    // show products based on color
    const showColors = () => colors.map((c) =>
        <div>
            <Radio value={c}
                key={c} 
                name={c} 
                checked={c === color} 
                onChange={handleColor}
                className="pb-1 pr-4">
                {c}
            </Radio>
        </div>);
    const handleColor = ((e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""},
        })
        setCategoryIds([]);
        setPrice([0, 0]);
        setStar("");
        setSub("");
        setBrand("");
        setShipping("");
        setColor(e.target.value);
        fetchProducts({color: e.target.value});
    })

    // show product by Shipping filter
    const showShipping = () => (<div>
            <Checkbox className="pb-2 pl-4 pr-4" 
                onChange={handleShippingChange}
                value="Yes"
                checked={shipping === "Yes"}>
                    Yes
            </Checkbox>
            <Checkbox className="pb-2 pl-4 pr-4" 
                onChange={handleShippingChange}
                value="No"
                checked={shipping === "No"}>
                    No
            </Checkbox>
        </div>);
    const handleShippingChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""},
        })
        setCategoryIds([]);
        setPrice([0, 0]);
        setStar("");
        setSub("");
        setBrand("")
        setColor("");
        setShipping(e.target.value)
        fetchProducts({shipping: e.target.value});
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']} mode="inline">
                        <SubMenu key="1" title={<span className="h6"><EuroOutlined /> Price</span>}>
                            <div>
                                <Slider className="ml-4 mr-4" 
                                    tipFormatter={(v) => `EUR ${v}`} 
                                    range value={price} 
                                    onChange={handleSlider}
                                    max="4999" />
                            </div>
                        </SubMenu>
                        <SubMenu key="2" title={<span className="h6"><DownSquareOutlined /> Categories</span>}>
                            <div>
                                <div style={{marginTop: "-10px"}}>{showCategories()}</div>
                            </div>
                        </SubMenu>
                        <SubMenu key="3" title={<span className="h6"><StarOutlined /> Rating</span>}>
                            <div>
                                <div style={{marginTop: "-10px"}}>{showStars()}</div>
                            </div>
                        </SubMenu>
                        <SubMenu key="4" title={<span className="h6"><CheckOutlined /> Sub categories</span>}>
                            <div>
                                <div style={{marginTop: "-10px"}} className="pl-4 pr-4">{showSubs()}</div>
                            </div>
                        </SubMenu>
                        <SubMenu key="5" title={<span className="h6"><CheckOutlined /> Brands</span>}>
                            <div>
                                <div style={{marginTop: "-10px"}} className="pl-4 pr-4">{showBrands()}</div>
                            </div>
                        </SubMenu>
                        <SubMenu key="6" title={<span className="h6"><CheckOutlined /> Colors</span>}>
                            <div>
                                <div style={{marginTop: "-10px"}} className="pl-4 pr-4">{showColors()}</div>
                            </div>
                        </SubMenu>
                        <SubMenu key="7" title={<span className="h6"><CheckOutlined /> Shipping</span>}>
                            <div>
                                <div style={{marginTop: "-10px"}} className="pl-4 pr-4">
                                    {showShipping()}
                                </div>
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9 pt-2">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="text-danger">Products</h4>
                    )}
                    {products.length < 1 && <p>No Products found</p>}
                    <div className="row pb-5">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Shop;
