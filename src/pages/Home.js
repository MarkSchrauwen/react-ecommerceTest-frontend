import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';

const Home = () => {

    return(
    <>
        <div className='jumbotron text-danger text-center h1 font-weight-bold'>
            <Jumbotron text={["New Arrivals", "Best Sellers", "Latest Products"]} />
        </div>
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">New Arrivals</h4>
        <NewArrivals />
        <br/>
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Bestsellers</h4>
        <BestSellers />
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Categories</h4>
        <CategoryList />
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Sub Categories</h4>
        <SubList />
    </>
    )
}

export default Home;