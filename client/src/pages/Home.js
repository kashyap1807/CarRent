import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions';
import { DatePicker, Row, Col } from 'antd';
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom';
import moment from 'moment';
const { RangePicker } = DatePicker;


function Home() {

    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalcars, setTotalcars] = useState([])
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {
        setTotalcars(cars)
    }, [cars])

    function setFilter(values) {
        var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm')

        var temp = []

        for (var car of cars) {
            if (car.bookedTimeSlots.length === 0) {
                temp.push(car)
            }
            else {
                for (var booking of car.bookedTimeSlots) {
                    if (selectedFrom.isBetween(booking.from, booking.to) ||
                        (selectedTo.isBetween(booking.from, booking.to)) ||
                        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
                        moment(booking.to).isBetween(selectedFrom, selectedTo)) {

                    }
                    else {
                        temp.push(car)
                    }
                }
            }
        }

        setTotalcars(temp)
    }

    
    return (

        <DefaultLayout>

        <div className="home">

            <br />
            <br />
            {/* {user &&  */}
            <h1>CarPool for the Planet</h1>
            <br />
            
            <div className="sec-1">

                <div className="container">
                    <div className="col61">
                        <h2 className="headinghome">Pick A Ride <br/>Contribute to Society</h2>
                        <br />
                        <p className="homep">[Partner with us to drive your own livelihood and more.]</p>
                        <br />
                        <br />
                        
                    </div>

                    <div className="col6">

                        <img src="https://img.freepik.com/free-vector/by-my-car-illustration-concept_114360-831.jpg?w=740&t=st=1679378358~exp=1679378958~hmac=ced290cbebd919f068ce67efd9cdd9ea3e57da960cf55228858676d2be372063" class="taxi-img" />
                    </div>
 
                </div>
            </div>

        </div>
        <div className="need">
                
                <br />
                <br />
                <h3 className="homeh3">Need A Ride ?</h3>
                <p className="homep">[Book ride here.]</p>

        </div>


            {/* <Row className='mt-3' justify="center" >
                <Col lg={20} sm={24} className='d-flex justify-content-center'>
                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD yyyy HH:mm' onChange={setFilter} />
                </Col>
            </Row> */}


            {loading === true && (<Spinner />)}
            <Row justify='center' gutter={16} key={cars._id} >
                {totalcars.map(car => {
                    return <Col lg={5} sm={24} xs={24} key={car._id} >
                        <div className="car p-2 bs1" >
                            <img src={car.image} alt='car_img' className='carimg' />
                            <div className="car-content d-flex align-items-center justify-content-between">

                                <div className="text-left pl-2">
                                    <p><b>{car.name}</b></p>
                                    <p> Rent Per Hour /- {car.rentPerHour}</p>
                                    <p>Starting point : {car.starting}</p>
                                    <p>Destination : {car.destination}</p>

                                </div>
                        

                                <div>
                                    <button className="btn1"><Link to={`/booking/${car._id}`}>Book Now</Link>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </Col>

                })}
            </Row>
                <br />
            <br />
           
            <div className="homsec2">
            <div class="containersec2">
                    <br />
                    <h2 class="heading-2">What !</h2>

                    <br/>
                    <div class="col3">
                        <div class="box">
                            
                        <h3 className="sec2h3">Your pick of rides at low prices</h3>
                        <p>[No matter where you’re going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.] </p>
                        </div>
                    </div>
                    <br />
                    <div class="col3">
                        <div class="box">
                            
                        <h3 className="sec2h3">Trust who you travel with</h3>
                        <p>[We take the time to get to know each of our members and bus partners. We check reviews, profiles and IDs, so you know who you’re travelling with and can book your ride at ease on our secure platform.]</p>
                        </div>
                    </div>
                    <br />
                    <div class="col3">
                        <div class="box">
                            
                        <h3 className="sec2h3">Scroll, click, tap and go!</h3>
                        <p>[Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes.]</p>
                        </div>
                    </div>
                    <br />
                    <div class="col3">
                        <div class="box">
                            
                        <h3 className="sec2h3">Your safety is our priority</h3>
                        <p>[At CarPool, we're working hard to make our platform as secure as it can be. But when scams do happen, we want you to know exactly how to avoid and report them. Follow our tips to help us keep you safe.]</p>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <br />
                </div>
            </div> 
            <br />
            <br />
            <h2 className='heading-2'><a href='/AddCar'>Publish Ride</a></h2>
           <br />

        </DefaultLayout >

    )
}


export default Home


