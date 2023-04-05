import { Col, Input, Row, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { editCar, getAllCars } from '../redux/actions/carsActions'

function EditCar() {



    const { carid } = useParams()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    const [car, setCar] = useState({})
    const [totalcars, setTotalcars] = useState([]);
    const { cars } = useSelector(state => state.carsReducer)

    useEffect(() => {

        if (cars.length === 0) {
            dispatch(getAllCars())
        }

        else {
            setTotalcars(cars)
            setCar(cars.find(car => car._id === carid))
        }
    }, [cars])

    function onFinish(values) {

        // values.bookedTimeSlots = []
        values._id= car._id
        dispatch(editCar(values))
        console.log(values)
    }


    return (

        <DefaultLayout>

            {loading && (<Spinner />)}

            <Row justify="center mt-5">

                <Col lg={12} sm={24} xs={24} className='p-2'>
                    {totalcars.length > 0 && (<Form initialValues={car} className="bs1 p-2" layout='vertical' onFinish={onFinish}>

                        <h3>Edit Car</h3>
                        <hr />

                        <Form.Item name="name" label="Car name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="image" label="Image Url" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="rentPerHour" label="Rent per hour" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <div className='text-right'>

                            <button className="btn1">Edit Car</button>

                        </div>

                    </Form>)}
                </Col>

            </Row>

        </DefaultLayout>
    )
}

export default EditCar

