import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCar, getAllCars } from '../redux/actions/carsActions';
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Button } from 'antd';



function AdminHome() {

    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalcars, setTotalcars] = useState([])
    const dispatch = useDispatch()
    // console.log(`${cars.length}`)

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {
        setTotalcars(cars)
    }, [cars])



    return (
        <DefaultLayout>

            <Row justify='center' gutter={16}>
                <Col lg={20} sm={24}>
                    <br />
                    <div className='d-flex align-items-center justify-content-between'>
                        <h3 className='mt-1 mr-2' style={{justifyContent: 'center'}}>Admin</h3>
                        <button className='btn1 mt-2' ><a href='/addcar'>ADD RIDE</a></button>
                    </div>
                </Col>
            </Row>

            {loading === true && (<Spinner />)}

            <Row justify='center' gutter={16} key={cars._id} >
                {totalcars.map(car => {
                    return <Col lg={5} sm={24} xs={24} key={car._id} >
                        <div className="car p-2 bs1">
                            <img src={car.image} alt='car_img' className='carimg' />
                            <div className="car-content d-flex align-items-center justify-content-between">

                                <div className="text-left pl-2">
                                    <p><b>{car.name}</b></p>
                                    <p> Rent Per Hour /- {car.rentPerHour}</p>
                                </div>

                                <div className="mr-4">
                                    <Link to={`/editcar/${car._id}`}><EditOutlined className="mr-3" style={{ color: 'green', cursor: 'pointer' }} /></Link>
                                    <Popconfirm
                                        // placement="rightTop"
                                        title='Are you sure you want to delete this car'
                                        onConfirm={() => { dispatch(deleteCar({ carid: car._id })) }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                    </Popconfirm>
                                </div>

                            </div>
                        </div>
                    </Col>

                })}
            </Row>
        </DefaultLayout>
    )
}


export default AdminHome


