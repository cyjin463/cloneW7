import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

// import {logoutM} from "../redux/modules/user";

import { history } from '../redux/configureStore'

import { Nav, Navbar, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import Grid from '../elements/Geid'

const Header = () => {
	// const dispatch = useDispatch()
	// const user = useSelector((state) => state.user)
	// const is_login = useSelector((state) => state.user.is_login)
	// console.log('Header', user, is_login)

    const a = 1


	if (a==1) {
        //로그인시 보여줄 화면
		return (
			<>
				<Navbar style={{height:"5rem"}} bg="#252525">
					<Container style={{height:"100%", display:"flex", WebkitBoxAlign:"center", alignItems:"center", WebkitBoxPack:"justify", justifyContent:"space-between"}}>
						<Navbar.Brand style={{color:"#ececec"}} onClick={() => { history.push( '/' ) }} >
                        Veloog 로고자리
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto" style={{display:"flex", WebkitBoxAlign:"center", alignItems:"center", position:"relative"}}></Nav>
                            <div  style={{display:"flex"}}>
                                <div style={{margin:"auto",cursor:"pointer", borderRadius:"50%", width:"24px", height:"24px", color:"white", position:"relative"}}>
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6144 14.6145C19.787 14.8653 18.9093 15.0001 18 15.0001C13.0294 15.0001 9 10.9707 9 6.00013C9 5.09088 9.13484 4.21311 9.3856 3.38574C5.69007 4.50583 3 7.93883 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.0613 21.0001 19.4943 18.3101 20.6144 14.6145Z" fill="currentColor"></path></svg>
                                </div>
                                <div style={{margin:"auto",cursor:"pointer", borderRadius:"50%", width:"25px%", height:"25px%", color:"white"}}>
                                <svg width="25" height="25" viewBox="0 0 17 17"><path fill-rule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clip-rule="evenodd" fill="currentColor"></path></svg>
                                </div>
                                <div style={{margin:"auto"}}>
                                <button style={{ height:"30px", padding:"0px 1rem 0px 1rem",borderRadius:"1rem", color:"darkGray", fontWeight:"bold", wordBreak:"keep-all", border:"1px solid #ececec", backgroundColor:"#232323", color:"#ececec", cursor:"pointer"}}>새 글 작성</button>
                                </div>
                                <div style={{margin:"auto"}}>
                                <img style={{ margin:"0px 0px 0px 1rem", display:"block", width:"40px", height:"40px", borderRadius:"50%", objectFit:"cover"}} src="http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcS_SMjGqJXvnd-5JpmTlvKMLpfPA 9be1tqsFe1rTRsVWkzRyVBBRLnMC-jfjTx4"/>
                                </div>
                            </div>
							
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</>
		)
	}
        //로그인 안했을때 보여줄 화면
	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="#252525"  >
				<Container>
					<Navbar.Brand style={{color:"#ececec"}} onClick={() => {history.push('/')}}>
						rkskek
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto"></Nav>
						<Nav>
							<Nav.Link style={{color:"#ececec"}} href="" onClick={() => { history.push('/signup')}}>
								회원가입
							</Nav.Link>
							<Nav.Link
                                style={{color:"#ececec"}}
								eventKey={2}
								href=""onClick={() => {history.push('/login')}}>
								로그인
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}




export default Header
