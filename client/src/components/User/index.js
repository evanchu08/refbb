import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import MyButton from '../UI/button';
import UserHistoryBlock from './Admin/historyBlock';

const userDashboard = ({ user }) => {
    return (

        < UserLayout >
            <div className="user_nfo_panel">
                <h1>User information</h1>
                <div>
                    <span>{user.userData.name}</span>
                    <span>{user.userData.lastname}</span>
                    <span>{user.userData.email}</span>
                </div>
                <MyButton
                    type="default"
                    title="Edit account info"
                    linkTo="/user/user_profile"
                />
            </div>
            {
                user.userData.history ?
                    <div className="user_nfo_panel">
                        <h1>History purchases</h1>
                        <div className="user_product_block_wrapper">
                            <UserHistoryBlock
                                history={user.userData.history}
                            />
                        </div>
                    </div> :
                    null
            }


        </UserLayout >
    )
}

export default userDashboard