import Footer from '@src/views/main/utilities/footer/Footer'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import { setToken } from '../../../../assets/auth/auth'
import { postReq } from '../../../../assets/auth/jwtService'
import FrontBaseLoader from '../../../Components/Loader/Loader'

export default function AffiliateLoginPage() {
    const navigate = useNavigate()
    const [apiLoader, setApiLoader] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const emailRef = useRef()
    const passwordRef = useRef()
    // console.log("getUserPermission", userPermission)
    //   erors
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })

    //   change event
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    // make toast

    //   form validation
    const validateForm = () => {
        if (!emailRef.current.value) {
            setFormErrors({ email: "Please enter your email ID" })
            return false
        }
        if (!passwordRef.current.value) {
            setFormErrors({ password: "Please enter your password" })
            return false
        }
        setFormErrors({})
        return true
    }

    //   from sub,mit
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: emailRef.current.value,
            password: passwordRef.current.value
        }
       
        // console.log("from data", emailRef.current.value)
        if (validateForm()) {
            // toast.success('form is valid')
            setApiLoader(true)
            const newformData = new FormData()
            Object.entries(formData).map(([key, value]) => newformData.append(key, value))
            postReq("loginAffiliate", newformData)
            .then((res) => {
                console.log(res.data)
                const tokenValue = JSON.stringify(res?.data?.token)
                setToken(tokenValue)
                if (res.status === 200 && tokenValue) {
                    toast.success('Logned In Successfully')
                    navigate("/merchant/affiliate/dashboard/")
                }
            })
            .catch((err) => {
                toast.error('Invalid Email or Password')
                // navigate("/new_signup/new_mode/")
                console.log(err)
            })
        }
        setApiLoader(false)

    }


    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                // callMyFunction();
                handleSubmit(event)
            }
        }
        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [])

    return (
        <div className='login_cont' style={{ background: "#fff" }}>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            {/* <Navbar /> */}
            <div className=' login_cont ' >
                <Row className=' justify-content-center mt-lg-1 pt-lg-5 '>
                    <Col md="10" xl="8">
                        <form className='mt-2  rounded-2  p-3 ' >
                            <h1 className='display-3 main-heading text-center fw-bolder    ' >
                                Login
                                {/* for Merchant Account */}
                            </h1>
                            <h4 className='text-center text-secondary '>To Your Affiliate Account</h4>
                            <Row className=' px-0 px-md-5 mt-1 '>

                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Email Address  </label>
                                    <input type="text" autoFocus ref={emailRef} className={`form-control form-control  fs-5 text-dark rounded-1  `} onChange={handleInputChange} placeholder="Email" name="email" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.email}</span>

                                </Col>

                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Password  </label>
                                    <input ref={passwordRef} type="password" className={`form-control form-control  fs-5 text-dark rounded-1  `} onChange={handleInputChange} placeholder="Password" name="password" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.password}</span>
                                </Col>
                                <div className='mt-1'>
                                    <Link to='/merchant/password_reset' className='text-dark  fs-5'>Forgotten Password?</Link>
                                </div>
                            </Row>

                            <div className='text-center mt-1'>
                                <h4 className='btn  main-btn-black btn-lg fs-4 px-5 fw-lig' onClick={handleSubmit}> Login</h4>
                            </div>
                            <div className='text-center'>
                                <Link to='/affiliate/signup' className='fs-4 '>New to XIRCLS? <span className='text-primary'> Signup here.</span></Link>
                            </div>
                        </form>
                    </Col>

                </Row>
            </div>
            <hr className='mt-5' />
            <Footer />

        </div>
    )
}
