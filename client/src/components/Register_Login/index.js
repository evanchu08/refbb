import React from 'react';
import MyButton from '../../components/UI/button';
import Login from './Login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>Users must register to purchase products<br />
                            This also gives access to the order history
                        </p>
                        <MyButton
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyle={{ margin: '10px 0  0 0' }}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>If you have an account, please log in.</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLogin