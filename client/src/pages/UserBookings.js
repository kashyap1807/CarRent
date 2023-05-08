import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/bookingActions'
import { Col, Row } from 'antd'
import moment from 'moment'
import Spinner from '../components/Spinner'


function UserBookings() {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingsReducer)
    const {loading} = useSelector(state => state.alertsReducer)
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(getAllBookings())
    }, [])
    return (


        <DefaultLayout>

            {loading && (<Spinner />)}

            <h3 className="text-center mt-2">User Bookings</h3>


            <Row justify="center" gutter={16}>
                <Col lg={20} sm={24}>
                    {bookings.filter(o => o.user === user._id).map((booking) => {
                        return <Row gutter={16} className="bs1 m-3 text-left">
                            <Col lg={6} sm={24}>
                                <h5><b>{booking?.car?.name}</b></h5>
                                <p> Transaction Id : {booking?.transactionId}</p>
                                <p>Total hours : {booking.totalHours}</p>
                                <p>Rent per hour : {booking?.car?.rentPerHour} /-</p>
                                <p>Total amount = {booking?.totalAmount}</p>
                            </Col>

                            <Col lg={12} sm={24}>
                                
                                <p>Starting Point : {booking?.car.starting}</p>
                                <p>Destination : {booking?.car.destination}</p>
                                <p>From : {booking?.bookedTimeSlots?.from}</p>
                                <p>To : {booking?.bookedTimeSlots?.to}</p>
                                <p>Date of booking : {moment(booking?.createdAt).format('MMM DD yyyy')}</p>
                            </Col>

                            <Col lg={6} sm={24} className="text-right" >
                                <img style={{ borderRedius: 5 }} alt="carimg" src={booking?.car?.image} height='140' className="p-2" />
                            </Col>
                        </Row>
                    })}
                </Col>
            </Row>
        </DefaultLayout>

    )
}

export default UserBookings

