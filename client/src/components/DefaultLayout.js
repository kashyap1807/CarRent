import React from 'react';
import { Menu, Dropdown, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';



function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'));   
	// alert(JSON.stringify(user))
    const menu = (
        <Menu>
            <Menu.Item>
                <a href="/">
                    Home
                </a>
            </Menu.Item>
            <Menu.Item>
                <a href="/userbookings">
                    Bookings
                </a>
            </Menu.Item>
           {user.username=="admin" && <Menu.Item>
                <a href="/admin">
                    Admin Panel
                </a>
            </Menu.Item> }
            <Menu.Item>
                <a href="/about">
                    About Us
                </a>
            </Menu.Item>
            <Menu.Item onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/login'
            }}>
                <li style={{ color: 'orangered' }}>Logout</li>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                        <div className="d-flex justify-content-between">
                            <h1 ><b><Link to='/' style={{fontSize:30}} >CarRent</Link></b></h1>
                            <div>
                            <Link to="/AddCar" id='links' style={{marginRight: "1.5rem"}}>Publish Ride</Link>
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <Button>{user.username}</Button>
                            </Dropdown>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
            <div className="content">{props.children}</div>

             <div className="footer text-center">

                <div className="footer-content">

                    <div class="container2">
  <div class="row">
    	<div class="col-md-12">
    	    <footer class="footer">				
		<div class="container">
			<div class="row">
				<div class="col-md-3 m-b-30">
					<div class="footer-title m-t-5 m-b-20 p-b-8">
						CarRent System
					</div>	
					<p class="white-text" style={{}}>
						This is a CarRent system...
						<br/>
						<br/>
						Design And Created By CarRent System Team.
					</p>
				</div>
				<div class="col-md-3 m-b-30">
					<div class="footer-title m-t-5 m-b-20 p-b-8">
						Useful Links
					</div>	
					<div class="footer-links">
						<a href="/login">
							Login
						</a>
						<a href="register">
							Register
						</a>
						<a href="/">
							Home
						</a>
						
					</div>
				</div>
				<div class="col-md-3 m-b-30">
					<div class="footer-title m-t-5 m-b-20 p-b-8">
						Quick Links
					</div>	
					<div class="footer-links">
						<a href="/AddCar">
							Publish
						</a>
						<a href="/about">
							About Us
						</a>
						<a href="/termscondi">
							Terms & conditions
						</a>
						
					</div>
				</div>
				<div class="col-md-3 m-b-30">
					<div class="footer-title m-t-5 m-b-20 p-b-8">
						Contact
					</div>	
					<div class="footer-links">
						<p>
							Delhi , D 10012 , Ind
						</p>
						<p>
							carrent18@gmail.com
						</p>
						<p>
							+91293 13256
						</p>
						
						
					</div>

					
				</div>
			</div>
		</div>
	</footer>
	<div class="footer-bottom">
        CarRent ©2023 Created by CarRent Team 
	</div>
    	</div>
	</div>
</div>
                    
                    {/* <h6>Carpool ©2023 Created by CarPool Team </h6> */}

                </div>
                

                
                
            </div> 


        </div>
    )
}

export default DefaultLayout
