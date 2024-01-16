import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import skeletonBg from "../SuperLeadz/Customization/skeleton.svg"
import { Home } from 'react-feather'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import { PermissionProvider } from '../../Helper/Context'
import DynamicForm from './components/DynamicForm'
import { Link } from 'react-router-dom'
import { Tone, getCurrentOutlet, strategy } from '../Validator'

const Themes = () => {

    const [selectedFilter, setSelectedFilter] = useState([])

    const { userPermission } = useContext(PermissionProvider)

    const [allThemes, setAllThemes] = useState([])

    const outletDetail = getCurrentOutlet()

    // const allPreviews = [
    //     {

    //     },
    //     {

    //     },
    //     {

    //     }
    // ]

    const getData = () => {
        fetch(`${SuperLeadzBaseURL}/api/v1/add_default_theme/?app=${userPermission?.appName}&shop=${outletDetail[0]?.web_url}`)
        .then((data) => data.json())
        .then((resp) => {
            console.log(resp)
            setAllThemes(resp?.success)
        setSelectedFilter([...strategy?.map((cur) => cur?.value), ...Tone?.map((cur) => cur?.value)])
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(selectedFilter)

    const filteredData = allThemes?.filter((curElem) => selectedFilter.includes(JSON.parse(curElem?.default_theme)?.page_1?.strategy) || selectedFilter.includes(JSON.parse(curElem?.default_theme)?.page_1?.tone))
    console.log(filteredData, "filteredData")
    return (
        <Container fluid className='px-0'>

            <style>
                {`
                    .flash_themes.active {
                        border: 1px solid #ccc;
                        border-radius: 6px;
                    }
                `}
            </style>
            <div className="d-flex justtify-content-center align-items-start">
                <div className="navHere" style={{width: '350px', height: '100%', padding: '0px 20px 10px'}}>
                    <Card>
                        <CardBody>
                            
                            <div className={`mb-2 d-flex justify-content-start align-items-center gap-1 flash_themes cursor-pointer ${[...strategy, ...Tone].length === selectedFilter.length ? 'active' : ''}`} style={{padding: '10px'}} onClick={() => {
                                if ([...strategy, ...Tone].length === selectedFilter.length) {
                                    setSelectedFilter([])
                                    
                                } else {
                                    setSelectedFilter([...strategy?.map((cur) => cur?.value), ...Tone?.map((cur) => cur?.value)])
                                }
                            }}>
                                <Home size={'20px'} />
                                <h4 className='m-0'>All Themes</h4>
                            </div>

                            {/* <div className={`mb-2 d-flex justify-content-start align-items-center gap-1 flash_themes cursor-pointer ${selectedFilter.includes("myThemes") ? 'active' : ''}`} style={{padding: '10px'}} onClick={() => {}}>
                                <Home size={'20px'} />
                                <h4 className='m-0'>My Themes</h4>
                            </div> */}

                            <div className={`mb-2`} style={{padding: '10px'}}>
                                <h4 className='m-0'>Strategy</h4>
                                <div className="checkboxs mt-1">
                                    {
                                        strategy?.map((curElem, key) => {
                                            return <div key={key} className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0" style={{padding: '0px', paddingBottom: '8px'}}>
                                                <label style={{ fontSize: "15px" }} htmlFor="keep_email_check">{curElem?.label}</label>
                                                <input value={curElem?.value} id="keep_email_check" checked={selectedFilter.includes(curElem?.value)} type='checkbox' className='form-check-input m-0 p-0 cursor-pointer' name="email_check" onChange={(e) => {
                                                    e.target.checked ? setSelectedFilter([...selectedFilter, e.target.value]) : setSelectedFilter(selectedFilter?.filter((curElem) => curElem !== e.target.value))
                                                }} />
                                            </div>
                                        })
                                    }
                                    
                                </div>
                            </div>

                            <div className={`mb-2`} style={{padding: '10px'}}>
                                <h4 className='m-0'>Tone</h4>
                                <div className="checkboxs mt-1">
                                    {
                                        Tone?.map((curElem, key) => {
                                            return <div key={key} className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0" style={{padding: '0px', paddingBottom: '8px'}}>
                                                <label style={{ fontSize: "15px" }} htmlFor="keep_email_check">{curElem?.label}</label>
                                                <input value={curElem?.value} id="keep_email_check" checked={selectedFilter.includes(curElem?.value)} type='checkbox' className='form-check-input m-0 p-0 cursor-pointer' name="email_check" onChange={(e) => {
                                                    e.target.checked ? setSelectedFilter([...selectedFilter, e.target.value]) : setSelectedFilter(selectedFilter?.filter((curElem) => curElem !== e.target.value))
                                                }} />
                                            </div>
                                        })
                                    }
                                    
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* <div key={key} className={`d-flex justify-content-start align-items-center gap-1 mt-2 flash_themes ${selectedFilter === "strategies" ? 'active' : ''}`} style={{padding: '10px'}} onClick={() => setSelectedFilter("strategies")}>
                        <a>Strategies</a>
                    </div> */}
                    
                </div>
                <div className="content_here w-100">
                    <Row className='match-height '>
                        {
                            filteredData?.length > 0 ? filteredData?.map((theme, key) => {
                                return (
                                    <Col className='d-flex flex-column align-items-stretch' md={6} key={key}>
                                        <Card>
                                            <CardBody>
                                                <div>
                                                    <div className="d-flex justify-content-center align-items-center rounded position-relative m-auto" style={{height: '375px', width: '100%', backgroundSize: "100%", backgroundImage: `url(${skeletonBg})`, backgroundColor: "rgba(0,0,0,0.25)", backgroundBlendMode: "soft-light" }}>
                                                        <DynamicForm data={JSON.parse(theme?.default_theme)} />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end align-items-center gap-2 mt-2">

                                                    {/* <h3 className="mt-2 mb-0">{theme.theme_name}</h3> */}

                                                    <Link className="btn btn-primary" to={`/merchant/Flash_Accounts/settings/${theme?.id ? theme?.id : ''}`}>Use Template</Link>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            }) : <>
                                <Card>
                                    <CardBody>
                                        <div className="text-center">
                                            <h4>Template not found</h4> 
                                        </div>
                                    </CardBody>
                                </Card>
                            </>
                        }
                    </Row>
                </div>
            </div>
        </Container>
    )
}

export default Themes