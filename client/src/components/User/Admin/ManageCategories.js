import React from 'react';
import UserLayout from '../../../hoc/UserLayout';
import ManangeBrands from './ManangeBrands';
import ManangeWoods from './ManangeWoods';

const ManageCategories = () => {
    return (
        <UserLayout>
            <ManangeBrands />
            <ManangeWoods />
        </UserLayout>
    )
}

export default ManageCategories