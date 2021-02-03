import React, {useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';

import CategoryForm from '../../../components/forms/CategoryForm';


import {getCategory, updateCategory} from '../../../functions/category';

const CategoryUpdate = ({history, match}) => {
    const {user} = useSelector(state => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {
        loadCategory() 
    }, []);

    const loadCategory = () => getCategory(match.params.slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(match.params.slug, {name}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" was succesfully updated !`)
            history.push("/admin/category");
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) toast.error(err.response.data);
        })
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading...</h4>
                    ) : (
                    <h4>Update Category</h4>)}
                    <CategoryForm 
                        handleSubmit={handleSubmit} 
                        name={name} 
                        setName={setName} />
                </div>
            </div>
        </div>
    )
};

export default CategoryUpdate;