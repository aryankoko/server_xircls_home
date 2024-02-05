/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Col, Row, Container } from 'reactstrap'
import Footer from '@src/views/main/utilities/footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { BsCheck, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import toast from 'react-hot-toast'
import { selectPhoneList } from '../../../../Helper/data'
import Select from 'react-select'
import axios from 'axios'
import { baseURL, getReq, postReq } from '../../../../assets/auth/jwtService'
import { setToken } from '../../../../assets/auth/auth'
import FrontBaseLoader from '../../../Components/Loader/Loader'


export default function SignupPage() {
    const countryOptions = [
        { value: 'usa', label: 'United States' },
        { value: 'canada', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'germany', label: 'Germany' },
        { value: 'france', label: 'France' },
        { value: 'australia', label: 'Australia' },
        { value: 'japan', label: 'Japan' },
        { value: 'brazil', label: 'Brazil' },
        { value: 'india', label: 'India' }
    ]
    const [apiLoader, setApiLoader] = useState(false)
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const navigate = useNavigate()
    const [ShowPass, setShowPass] = useState({
        pass: false,
        cpass: false
    })
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        phone_code: '',
        phone_no: '',
        address1: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        password: '',
        confirm_password: ''
    })


    const CustErrorMsg = {
        first_name: 'Please enter your first name',
        last_name: 'Please enter your last name',
        username: 'Please enter your email ID',
        phone_no: 'Please enter your phone number',
        phone_code: 'Please enter your country code',
        address1: "Please enter your address",
        address2: "Please enter your address",
        country: "Please enter your country",
        state: "Please enter your state",
        pincode: "Please enter your pincode",
        city: "Please enter your city",
        password: 'Please enter your password',
        confirm_password: 'Please confirm your password',
        uppercase: 'one uppercase letter,',
        lowercase: 'one lowercase letter,',
        number: 'one number,',
        specialChar: 'one special character,',
        length: 'password must be 8 to 18 characters long,'
    }

    //   erors
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        getReq('countries')
            .then((resp) => {
                console.log(resp)
                setCountry(resp.data.data.countries.map((curElem) => {
                    return { value: curElem.id, label: `${curElem.name}` }
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    useEffect(() => {
      

            const form_data = new FormData()
            form_data.append('country_id', formData.country)
            postReq('getState', form_data)
            .then((resp) => {
                console.log(resp)
                setState(resp.data.data.states.map((curElem) => {
                    return {value: curElem.id, label: `${curElem.name}`}
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [formData.country])

    // password valid error
    const generateErrorMessage = (condition, message) => {
        const isSuccess = condition ? 'text-secondary' : 'text-success'
        return (
            <h6 className={`m-0 p-0 d-flex justify-content-start align-items-center ${isSuccess}`}>
                <BsCheck />
                {message}
            </h6>
        )
    }
    const passValid = (value) => {
        const errors = {}
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,18}$/

        const isValid = passwordPattern.test(value)

        errors.uppercase = generateErrorMessage(!/(?=.*[A-Z])/.test(value), 'one uppercase letter,')
        errors.lowercase = generateErrorMessage(!/(?=.*[a-z])/.test(value), 'one lowercase letter,')
        errors.number = generateErrorMessage(!/(?=.*\d)/.test(value), 'one number,')
        errors.specialChar = generateErrorMessage(!/(?=.*[@#$%^&+=!])/.test(value), 'one special character')
        errors.length = generateErrorMessage(
            value.length < 8 || value.length > 18,
            'password must be 8 to 18 characters long'
        )

        setFormErrors(errors)
        setFormData((preData) => ({
            ...preData,
            checkPassword: isValid
        }))

        return isValid
    }

    //   input handle event
    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })

        if (name === 'password') {
            passValid(value)
        }
    }

    const handleInputChange2 = (e, name) => {
        setFormData({
            ...formData,
            [name]: e.label
        })
    }

    //  all form validation
    const validateForm = () => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

        if (!formData.first_name) {
            setFormErrors({ first_name: CustErrorMsg.first_name })
            return false
        }
        if (!formData.last_name) {
            setFormErrors({ last_name: CustErrorMsg.last_name })
            return false
        }

        if (!formData.username) {
            setFormErrors({ username: CustErrorMsg.username })
            return false
        }

        if (!emailPattern.test(formData.username)) {
            setFormErrors({ username: "Invalid email address" })
            return false
        }
        if (!formData.phone_no) {
            setFormErrors({ phone_no: CustErrorMsg.phone_no })
            return false
        }
        if (!formData.phone_code) {
            setFormErrors({ phone_no: CustErrorMsg.phone_code })
            return false
        }
        if (!formData.address1) {
            setFormErrors({ address1: CustErrorMsg.address1 })
            return false
        }
        if (!formData.address2) {
            setFormErrors({ address2: CustErrorMsg.address2 })
            return false
        }
        if (!formData.country) {
            setFormErrors({ country: CustErrorMsg.country })
            return false
        }
        if (!formData.state) {
            setFormErrors({ state: CustErrorMsg.state })
            return false
        }
        if (!formData.city) {
            setFormErrors({ city: CustErrorMsg.city })
            return false
        }
        if (!formData.pincode) {
            setFormErrors({ pincode: CustErrorMsg.pincode })
            return false
        }

        if (!formData.password) {
            setFormErrors({ password: CustErrorMsg.password })
            return false

        }
        passValid(formData.password)
        if (!formData.checkPassword) {
            return false
        }
        if (!formData.confirm_password) {
            setFormErrors({ confirm_password: CustErrorMsg.confirm_password })
            return false
        }
        if (formData.confirm_password && (formData.confirm_password !== formData.password)) {
            setFormErrors({ confirm_password: "Password does not match" })
            return false
        }
        setFormErrors({})
        return true
    }

    //   from submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("formErrors", formErrors)
        console.log('Form data is valid:', formData)

        if (validateForm()) {
            setApiLoader(true)
            const newformData = new FormData()
            Object.entries(formData).map(([key, value]) => {
                if (key !== 'checkPassword') {
                    newformData.append(key, value)
                }
            })
            console.log("form data", newformData)

            try {
                const res = await postReq("signupAffiliate", newformData)

                console.log(res.data)
                const tokenValue = JSON.stringify(res.data)
                setToken(tokenValue)

                if (res.status === 201) {
                    toast.success('Signed in successfully')
                    navigate("/affiliate/login")
                }
                if (res.status === 400) {
                    toast.success('Email Already Exist')
                }
            } catch (err) {
                console.error(err)

                if (err.messages) {
                    toast.error(err.messages)
                } else {
                    toast.error('An error occurred')
                }
            } finally {
                setApiLoader(false)
            }
        } else {
            console.log('Form data is invalid')
            setApiLoader(false)
        }
    }


    return (
        <div className='' style={{ background: "#fff" }}>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <Container fluid="sm" className='  ' >
                <Row className=' justify-content-center mt-lg-1 pt-lg-5 '>
                    <Col md="10" xl="8">
                        <form className='mt-2 p-3' onSubmit={handleSubmit} >
                            <h1 className='display-3 main-heading text-center fw-bolder    ' >
                                Sign Up
                            </h1>
                            <h4 className='text-center text-secondary '>For a New Affiliate Account</h4>
                            <Row className=' px-0 px-md-5 mt-3 '>
                                <Col xs="12" md="6" className=''>
                                    <label className="fs-4 main-heading">First Name  </label>
                                    <input type="text" className="form-control form-control  fs-5 text-capitalize text-dark rounded-1" onChange={handleInputChange} placeholder="First Name" name="first_name" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.first_name}</span>
                                </Col>
                                <Col xs="12" md="6" className='mt-1 mt-md-0'>
                                    <label className="fs-4 main-heading">Last Name  </label>
                                    <input type="text" className="form-control form-control  fs-5 text-capitalize text-dark rounded-1" onChange={handleInputChange} placeholder="Last Name" name="last_name" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.last_name}</span>

                                </Col>

                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Email Address  </label>
                                    <input type="text" className="form-control form-control  fs-5 text-dark rounded-1" onChange={handleInputChange} placeholder="Email" name="username" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.username}</span>
                                    <span className="error text-danger " id="Email_error" style={{ display: "none" }}>Email already exist</span>
                                </Col>

                                {/* mobile  */}
                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Mobile Number</label>
                                    <Row className=' row-gap-1 '>
                                        <Col xs="12" md="4" className=''>
                                            <Select
                                                isMulti={false}
                                                options={selectPhoneList}
                                                closeMenuOnSelect={true}
                                                name="phone_code"
                                                onChange={(e) => setFormData({ ...formData, phone_code: e.value })}
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        fontSize: '14px',
                                                        padding: "3px 0px",
                                                        height: "20px"
                                                    })
                                                }}
                                            />
                                        </Col>
                                        <Col xs="12" md="8" className=''>
                                            <input type="number" className={`form-control form-control fs-5 text-dark rounded-1`} onChange={handleInputChange} name="phone_no" placeholder="Mobile" />

                                        </Col>
                                    </Row>
                                    <div className='d-flex justify-content-center  align-items-start ' style={{ marginTop: "4px" }}>

                                    </div>
                                    <span className="error text-danger ">{formErrors.phone_no}</span>

                                </Col>
                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Address 1
                                    </label>
                                    <input type="text" className="form-control form-control  fs-5 text-dark rounded-1" onChange={handleInputChange} placeholder="Address 1" name="address1" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.address1}</span>
                                </Col>
                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Address 2
                                    </label>
                                    <input type="text" className="form-control form-control  fs-5 text-dark rounded-1" onChange={handleInputChange} placeholder="Address 2" name="address2" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.address2}</span>
                                </Col>
                                <Col xs="12" md="6" className='mt-2'>
                                    <label className="fs-4 main-heading">Country  </label>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        // isSearchable={isSearchable}
                                        name="country"
                                        options={country}
                                        onChange={(e) => handleInputChange2(e, 'country')}

                                    />
                                    <span className="error text-danger ">{formErrors.country}</span>
                                </Col>
                                <Col xs="12" md="6" className='mt-2'>
                                    <label className="fs-4 main-heading">State  </label>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        // isSearchable={isSearchable}
                                        name="state"
                                        options={state}
                                        onChange={(e) => handleInputChange2(e, 'state')}
                                    />
                                    <span className="error text-danger ">{formErrors.state}</span>
                                </Col>
                                <Col xs="12" md="6" className='mt-2'>
                                    <label className="fs-4 main-heading">City  </label>
                                    <input type="text" className="form-control form-control  fs-5 text-capitalize text-dark rounded-1" onChange={handleInputChange} placeholder="City" name="city" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.city}</span>
                                </Col>
                                <Col xs="12" md="6" className='mt-2'>
                                    <label className="fs-4 main-heading">Pin Code  </label>
                                    <input type="number" className="form-control form-control  fs-5 text-capitalize text-dark rounded-1" onChange={handleInputChange} placeholder="Pin code" name="pincode" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.pincode}</span>
                                </Col>
                                <Col xs="12" className='mt-2  position-relative '>
                                    <label className="fs-4 main-heading">Password  </label>
                                    <input type={ShowPass.pass ? 'text' : 'password'} className="form-control form-control  fs-5 text-dark rounded-1" id="signup_pass_input" onChange={handleInputChange} placeholder="Password" name="password" style={{ marginTop: "4px" }} autoComplete="new-password" />

                                    <h4 className='position-absolute  cursor-pointer' style={{ top: "38px", right: "30px", color: "#a9a9a9" }} onClick={() => setShowPass({ ...ShowPass, pass: !ShowPass.pass })} >{ShowPass.pass ? <BsEyeFill /> : <BsEyeSlashFill />}</h4>
                                    <div className='text-danger'> {formErrors.password}</div>
                                    <div className='d-flex flex-column user-select-none' >

                                        {formErrors.uppercase}
                                        {formErrors.lowercase}
                                        {formErrors.number}
                                        {formErrors.specialChar}
                                        {formErrors.length}
                                    </div>

                                </Col>
                                <Col xs="12" className='mt-2 mt-2 position-relative'>
                                    <label className="fs-4 main-heading">Confirm Password  </label>
                                    <input type={ShowPass.cpass ? 'text' : 'password'} className="form-control form-control  fs-5 text-dark rounded-1" onChange={handleInputChange} placeholder="Confirm Password" name="confirm_password" style={{ marginTop: "4px" }} autoComplete="new-password" />
                                    <h4 className='position-absolute  cursor-pointer' style={{ top: "38px", right: "30px", color: "#a9a9a9" }} onClick={() => setShowPass({ ...ShowPass, cpass: !ShowPass.cpass })} >{ShowPass.cpass ? <BsEyeFill /> : <BsEyeSlashFill />}</h4>

                                    <span className="error text-danger ">{formErrors.confirm_password}</span>
                                </Col>

                            </Row>
                            <div className='text-center mt-3'>
                                <button type='submit' className='btn  main-btn-black btn-lg fs-4 px-5 fw-lig' onClick={handleSubmit}> Signup</button>
                            </div>
                            <div className='text-center'>
                                <Link to='/affiliate/login' className='fs-4 '>Already a XIRCLS affiliate?<span className='text-primary'> Login here.</span></Link>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
            <hr className='mt-5' />
            <Footer />

        </div>
    )

}
