import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';
import Spinner from '../components/Spinner';
import { Col, Divider, Row } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment'
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { bookCar } from '../redux/actions/bookingActions';
import Modal from 'antd/lib/modal/Modal';
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const { RangePicker } = DatePicker;


function BookingCars() {
  // const initial = {
  //     totalAmount: 0
  // }
  const { carid } = useParams()
  const [car, setCar] = useState({})
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [driver, setDriver] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { cars } = useSelector(state => state.carsReducer)
  const { loading } = useSelector(state => state.alertsReducer)
  const dispatch = useDispatch()


  useEffect(() => {

    if (cars.length === 0) {
      dispatch(getAllCars())
    }

    else {
      setCar(cars.find(car => car._id === carid))
    }
  }, [cars])

  useEffect(() => {
    setTotalAmount((totalHours * car.rentPerHour))

    if (driver) {
      setTotalAmount((totalAmount + (500 * totalHours)))
    }

  }, [driver, totalHours])

  function selectTimeSlots(values) {

    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"))
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"))

    setTotalHours(values[1].diff(values[0], 'hours'))
  }

  // function bookNow() {

  // }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to
      }
    }
    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>

        <Col lg={10} xs={24} sm={24} className='p-3'>
          <img src={car.image} className="carimg2 bs1 w-100" alt="carimg" data-aos='flip-left' data-aos-duration='1500' />
        </Col>

        <Col lg={10} xs={24} sm={24} className="text-right" >
          <Divider dashed >Car Info</Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>Fuel Type : {car.fuelType} </p>
            <p>Max-Persons : {car.capacity} </p>

          </div>

          <Divider dashed >Ride Info</Divider>
          <div style={{ textAlign: "right" }}>
            <p>Starting Point : {car.starting} </p>
            <p>Destination : {car.destination} </p>

          </div>

          <Divider dashed >Select Time Slots</Divider>
          <RangePicker showTime={{ format: "HH:mm" }} format='MMM DD yyyy HH:mm' onChange={selectTimeSlots} />
          <br />
          <button className='btn1 mt-2' onClick={() => { setShowModal(true) }}>See booked Slots</button>

          {from && to && (<div>
            <p>Total Hours: <b>{totalHours}</b></p>
            <p>Rent Per Hour/- <b>{car.rentPerHour} Rs.</b> </p>
            {/* <Checkbox onChange={(e) => {
              if (e.target.checked) {
                setDriver(true)
              }
              else {
                setDriver(false)
              }
            }} >Driver Requred</Checkbox> */}

            <h3>Total Amount: <b>{totalAmount} Rs.</b></h3>

            <StripeCheckout
              shippingAddress
              currency='inr'
              token={onToken}
              amount={totalAmount * 100}
              stripeKey="pk_test_51K7wa4SEPK45WRcGSYjU4qsFiBVTLrNfe7fjRG6VPa1L3TeyAd1CtKx5bclpmTZB5QXHGpO6bQtPF0fmEZaRXb1y00EOwo9z0n"
            >
              <button className="btn1">Book Now</button>
            </StripeCheckout>



          </div>

          )}

        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-3">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>




    </DefaultLayout >
  )
}

export default BookingCars

