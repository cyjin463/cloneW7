
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user'
import { actionCreators as postActions } from "../redux/modules/post"

// import {logoutM} from "../redux/modules/user";

import { history } from '../redux/configureStore'
import { getCookie } from '../shared/Cookie';
import { Nav, Navbar, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const Header = (props) => {
	const dispatch = useDispatch();

	const is_login = useSelector(state => state.user.isLogin);

	const user_info = useSelector(state => state.user.userInfo);

	const post_id = useSelector(state => state.post.list2.postingId)
	console.log(post_id)

	const [view, setview] = React.useState(false);

	const X = () => {
		setview(!view)
	}
	return (
		<>
			<div style={{ height: "4rem", margin:"0px 31px 0px 31px" }}>
					<div style={{
						height: "100%",
						display: "flex",
						WebkitBoxAlign: "center",
						alignItems: "center",
						WebkitBoxPack: "justify",
						justifyContent: "space-between",
						marginLeft: "auto",
						marginRight: "auto",
					}}>
						<div style={{
							display: "flex",
							WebkitBoxAlign: "center",
							alignItems: "center",
							WebkitBoxPack: "center",
							justifyContent: "center",
							fontWeight: "bold",
							color: "#ececec",
							fontSize: " 1.3125rem",
							textDecoration: "none",
							fontFamily: "Fira Mono, monospace"
						}}>
							<div style={{
								display: "flex",
								WebkitBoxAlign: "center",
								alignItems: "center",
								color: "inherit",
								textDecoration: "none",
								cursor: "pointer",
							}}
								onClick={() => { history.push('/') }}
							>
								<svg
									width="71"
									height="24"
									viewBox="0 0 71 24"
									fill="none"
									data-testid="velog-logo"
									className="velog-logo">
									<path

										d="M12.248 5.328L7.76 18H4.64L0.152 5.328H3.056L6.248 15.768L9.488 5.328H12.248ZM17.7586 12.528C17.8386 13.76 18.1906 14.688 18.8146 15.312C19.4546 15.92 20.2546 16.224 21.2146 16.224C21.8066 16.224 22.3666 16.136 22.8946 15.96C23.4386 15.768 23.9906 15.488 24.5506 15.12L25.7026 16.752C25.1106 17.248 24.4146 17.632 23.6146 17.904C22.8146 18.176 21.9746 18.312 21.0946 18.312C19.1586 18.312 17.6546 17.712 16.5826 16.512C15.5106 15.296 14.9746 13.68 14.9746 11.664C14.9746 10.4 15.2066 9.264 15.6706 8.256C16.1346 7.232 16.8066 6.432 17.6866 5.856C18.5666 5.28 19.5906 4.992 20.7586 4.992C22.4386 4.992 23.7666 5.56 24.7426 6.696C25.7346 7.816 26.2306 9.36 26.2306 11.328C26.2306 11.808 26.2066 12.208 26.1586 12.528H17.7586ZM20.7826 6.984C19.9186 6.984 19.2146 7.296 18.6706 7.92C18.1266 8.544 17.8146 9.472 17.7346 10.704H23.6146C23.5826 9.504 23.3266 8.584 22.8466 7.944C22.3666 7.304 21.6786 6.984 20.7826 6.984ZM35.4853 14.544C35.4853 15.616 36.1253 16.152 37.4053 16.152C38.0453 16.152 38.7173 16.008 39.4213 15.72L40.0933 17.592C39.2133 18.072 38.1253 18.312 36.8293 18.312C35.5653 18.312 34.5733 17.96 33.8533 17.256C33.1493 16.536 32.7973 15.552 32.7973 14.304V2.208H28.9813V0.24H35.4853V14.544ZM49.3959 4.992C51.2199 4.992 52.6279 5.592 53.6199 6.792C54.6119 7.976 55.1079 9.592 55.1079 11.64C55.1079 13.688 54.6039 15.312 53.5959 16.512C52.5879 17.712 51.1799 18.312 49.3719 18.312C47.5479 18.312 46.1319 17.728 45.1239 16.56C44.1319 15.376 43.6359 13.744 43.6359 11.664C43.6359 9.648 44.1399 8.032 45.1479 6.816C46.1719 5.6 47.5879 4.992 49.3959 4.992ZM49.3959 7.08C48.4199 7.08 47.6839 7.456 47.1879 8.208C46.7079 8.96 46.4679 10.112 46.4679 11.664C46.4679 13.232 46.7079 14.392 47.1879 15.144C47.6679 15.88 48.3959 16.248 49.3719 16.248C50.3479 16.248 51.0759 15.872 51.5559 15.12C52.0359 14.368 52.2759 13.208 52.2759 11.64C52.2759 10.088 52.0359 8.944 51.5559 8.208C51.0759 7.456 50.3559 7.08 49.3959 7.08ZM70.0745 5.952C69.6105 6.112 69.0825 6.224 68.4905 6.288C67.9145 6.336 67.2185 6.36 66.4025 6.36C67.1705 6.712 67.7465 7.152 68.1305 7.68C68.5145 8.208 68.7065 8.848 68.7065 9.6C68.7065 10.432 68.4985 11.168 68.0825 11.808C67.6825 12.448 67.1065 12.952 66.3545 13.32C65.6025 13.688 64.7145 13.872 63.6905 13.872C62.9705 13.872 62.3945 13.8 61.9625 13.656C61.7865 13.784 61.6505 13.944 61.5545 14.136C61.4585 14.312 61.4105 14.504 61.4105 14.712C61.4105 15.352 61.9305 15.672 62.9705 15.672H65.1785C66.0745 15.672 66.8745 15.824 67.5785 16.128C68.2825 16.432 68.8265 16.856 69.2105 17.4C69.6105 17.928 69.8105 18.528 69.8105 19.2C69.8105 20.464 69.2665 21.44 68.1785 22.128C67.0905 22.832 65.5225 23.184 63.4745 23.184C62.0505 23.184 60.9225 23.032 60.0905 22.728C59.2745 22.44 58.6905 22.008 58.3385 21.432C58.0025 20.872 57.8345 20.144 57.8345 19.248H60.2345C60.2345 19.728 60.3225 20.104 60.4985 20.376C60.6905 20.664 61.0185 20.872 61.4825 21C61.9465 21.144 62.6185 21.216 63.4985 21.216C64.7785 21.216 65.6985 21.056 66.2585 20.736C66.8185 20.432 67.0985 19.976 67.0985 19.368C67.0985 18.856 66.8745 18.456 66.4265 18.168C65.9945 17.896 65.4025 17.76 64.6505 17.76H62.4665C61.3305 17.76 60.4665 17.528 59.8745 17.064C59.2985 16.6 59.0105 16.016 59.0105 15.312C59.0105 14.88 59.1305 14.464 59.3705 14.064C59.6105 13.664 59.9545 13.32 60.4025 13.032C59.6505 12.632 59.0985 12.152 58.7465 11.592C58.4105 11.016 58.2425 10.312 58.2425 9.48C58.2425 8.6 58.4665 7.824 58.9145 7.152C59.3625 6.464 59.9865 5.936 60.7865 5.568C61.5865 5.184 62.4985 4.992 63.5225 4.992C64.8985 5.008 65.9865 4.912 66.7865 4.704C67.6025 4.496 68.4665 4.168 69.3785 3.72L70.0745 5.952ZM63.5465 6.864C62.6985 6.864 62.0585 7.104 61.6265 7.584C61.1945 8.048 60.9785 8.68 60.9785 9.48C60.9785 10.296 61.1945 10.944 61.6265 11.424C62.0745 11.888 62.7225 12.12 63.5705 12.12C64.3705 12.12 64.9785 11.888 65.3945 11.424C65.8105 10.96 66.0185 10.296 66.0185 9.432C66.0185 7.72 65.1945 6.864 63.5465 6.864Z"
										fill="currentColor">
									</path>
								</svg>
							</div>
						</div>
							
										<div style={{
											display: "flex",
											WebkitBoxAlign: "center",
											alignItems: "center",
											position: "relative",
											}}>
											<button style={{
												background: "none",
												border: "none",
												cursor: "pointer",
												borderRadius: "50%",
												width: "2.5rem",
												height: "2.5rem",
												marginRight: "0.25rem",
												color: "white",
												position: "relative",
												fontFamily: "inherit",
											}}>
												<div style={{
													position: "absolute",
													top: "50%",
													left: "50%",
													transform: "translate(-50%, -50%)",
												}}>
													<div style={{
														transform: "scale(1) rotate(0deg)",
														opacity: "1",
														color: "#ececec",
													}}>
														<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
															<path fillRule="evenodd" clipRule="evenodd" d="M20.6144 14.6145C19.787 14.8653 18.9093 15.0001 18 15.0001C13.0294 15.0001 9 10.9707 9 6.00013C9 5.09088 9.13484 4.21311 9.3856 3.38574C5.69007 4.50583 3 7.93883 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.0613 21.0001 19.4943 18.3101 20.6144 14.6145Z" fill="currentColor">
															</path>
														</svg>
													</div>
												</div>
											</button>
											<div style={{
												display: "flex",
												WebkitBoxAlign: "center",
												alignItems: "center",
												WebkitBoPack: "center",
												justifyContent: "center",
												background: "transparent",
												border: "none",
												width: "2.5rem",
												height: "2.5rem",
												outline: "none",
												borderRadius: "50%",
												color: "#ececec",
												cursor: "pointer",
												marginRight: "0.5rem",
											}}>
												<svg width="17" height="17" viewBox="0 0 17 17">
													<path fillRule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clipRule="evenodd" fill="currentColor">
													</path>
												</svg>
											</div>
											{is_login ?
											<button style={{
												height: "2rem",
												paddingLeft: "1rem",
												paddingRight: "1rem",
												fontSize: "1rem",
												borderRadius: "1rem",
												outline: "none",
												fontWeight: "bold",
												wordBreak: "keep-all",
												background: "#1e1e1e",
												border: "1px solid #f1f3f5",
												color: "#f1f3f5",
												transition: "all 0.125s ease-in 0s",
												cursor: "pointer",
												marginRight: "1.25rem",
											}}
												onClick={() => { history.push('/write') }}
											>
												새 글 작성
											</button> 
											:
											<button style={{height: "2rem",
															paddingLeft: "1rem",
															paddingRight: "1rem",
															fontSize: "1rem",
															borderRadius: "1rem",
															border: "none",
															outline: "none",
															fontWeight: "bold",
															wordBreak: "keep-all",
															background: "#f1f3f5",
															color: "#121212",
															transition: "all 0.125s ease-in 0s",
															cursor: "pointer",
															}}
													onClick={()=>{history.push("/login")}}
															>
												로그인</button>}

											{is_login ?
											<div>
												<div style={{
													cursor: "pointer",
													display: "flex",
													WebkitBoxAlign: "center",
													alignItems: "center",
												}}
												onClick={X}
												>
													<img style={{display: "block",
																height: "2.5rem",
																width: "2.5rem",
																boxShadow: "rgb(0 0 0 / 9%) 0px 0px 8px",
																borderRadius: "50%",
																objectFit: "cover",
																transition: "all 0.125s ease-in 0s"
																}}
																src={user_info.imgUrl}
															/>
													<svg style={{
														fontSize: "1.5rem",
														marginLeft: "0.25rem",
														color: "#acacac",
														transition: "all 0.125s ease-in 0s",
														marginRight: "-0.4375rem",
														stroke: "currentcolor",
														fill: "currentcolor",
														strokeWidth: "0",
														height: "1em",
														width: "1em",
														overflow: "hidden",
														cursor: "pointer",
													}}
														stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
														<path style={{ transformOrigin: "0px 0px" }} d="M7 10l5 5 5-5z">
														</path>
													</svg>
												</div>
											</div> : null }
												
									{ is_login && view===true ?
										<div>
											<div style={{
												position: "absolute",
												top: "100%",
												marginTop: "1rem",
												right: "0px",
												}}>
												<div style={{
												position: "relative",
												zIndex: "5",
												width: "12rem",
												background: "#1e1e1e",
												boxShadow: "rgb(0 0 0 / 10%) 0px 0px 8px",
												}}>
												<div style={{
													color: "inherit",
													textDecoration: "none",
													}}>
													<div style={{
															color: "#ececec",
															padding: "0.75rem 1rem",
															lineHeight: "1.5",
															fontWeight: "500",
															cursor: "pointer",
															}}
															onClick={() => { history.push(`/My/${user_info.nickname}`); setview(!view) }}>
														내 벨로그
													</div>
												</div> 
												<div style={{
												color: "#ececec",
												padding: "0.75rem 1rem",
												lineHeight: "1.5",
												fontWeight: "500",
												cursor: "pointer",
												}}
												onClick={() => { dispatch(userActions.logOut()); history.replace('/') }}
											>
											로그아웃
										</div>
									</div>
								</div>
							</div>: null }
						</div>	
					</div>
				</div>
				
		</>
	)
}

export default Header


