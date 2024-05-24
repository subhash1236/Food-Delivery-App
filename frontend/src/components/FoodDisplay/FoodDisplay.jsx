import React, { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';

// eslint-disable-next-line react/prop-types
const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    // Filter the food list based on the category
    const filteredFoodList = category === "All" 
        ? food_list 
        : food_list.filter(item => item.category === category);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {filteredFoodList.map((item, index) => (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;
