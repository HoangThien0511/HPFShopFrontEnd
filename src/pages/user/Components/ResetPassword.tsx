import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import { useNavigate, NavLink } from 'react-router-dom';
import { login } from '../../../api_slice/api_user';
import FormForgotPassword from './FormResetPassword';

type Props = {
}

interface FormValues {
    phoneNumber: {
        phoneNumber: string;
    };
    password: {
        password: string;
    };
}

const ResetPassword = (props: Props) => {
    return (
        <div className='signin_page col-md-3 col-12'>
            <FormForgotPassword />
        </div>
    )
}

export default ResetPassword