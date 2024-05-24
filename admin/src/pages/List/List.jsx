/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import "./List.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const List = ({url}) => {
    
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Failed to fetch the list");
            }
        } catch (error) {
            toast.error("An error occurred while fetching the list");
        }
    };

    const removeFood = async (foodId)=>{
        const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
            
        }else{
            toast.error("Error");
        }
        

    }

    useEffect(() => {
        fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='list'>
            <h2>All Foods List</h2>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div key={index} className='list-table-format '>
                            <img src={`${url}/images/${item.image}`} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p onClick={()=>removeFood(item._id)} className='cusor'>X</p>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}

export default List;
