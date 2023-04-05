import React from 'react';
import { Col, Input, Row, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';

function Register() {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer);

    function onFinish(values) {
        if (values.password === values.cpassword) {
            dispatch(userRegister(values))
        }
        else{
            message.error('please check your password')
        }
        console.log(values)
    }

    return (
        <div className="login">
            {loading && (<Spinner />)}
            
            <h2 className="heading">CarPool System</h2>
            <Row gutter={16} className='d-flex align-items-center'>

                <Col lg={16} style={{ position: 'relative' }}>
                    <img className='w-100' data-aos='slide-left' data-aos-duration='1500' src="https://img.freepik.com/free-vector/automobile-purchase-young-couple-smiling-salesman-characters-man-buying-auto-dealer-buyer-shaking-hands_575670-1003.jpg?w=1060&t=st=1679306781~exp=1679307381~hmac=24fdcc59107e89869f4ae77bdf346f04066f5481bc75822402b20c32ccff8c28" alt="carimg" />
                    
                    <h1 className='login-logo'>CARPOOL</h1>
                </Col>
                <Col lg={8} className="text-left p-5">

                

                    <div className="content2">

                    <Form layout='vertical' className="login-form p-5" onFinish={onFinish}>
                        <h1>Register</h1>
                        <hr />
                        <Form.Item name='username' label="Username" rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label="Password" rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item name='cpassword' label="Confirm Password" rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>

                        <button className='btn1 mt-2'>Register</button>
                        <hr />

                        <Link to='/login'>*Click here to Login</Link>

                    </Form>
                    </div>

                </Col>
            </Row>
        </div>

    )
}

export default Register
