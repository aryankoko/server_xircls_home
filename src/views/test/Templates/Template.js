/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { BsFire } from "react-icons/bs"
import { CiCloud } from "react-icons/ci"
import { Activity, List, Edit, Clock, Check, AlertCircle, Home, Star } from 'react-feather'
import AllTemp from './components/AllTemp'

export default function Template() {

    const [MainMenu, setMainMenu] = useState(1)
    const [SubMenu, setSubMenu] = useState(1)

    const submenuList = [
        {
            title: "Trending",
            icon: <BsFire size={'20px'} />
        },
        {
            title: "General",
            icon: <CiCloud size={'20px'} />
        },
        {
            title: "Top Rated",
            icon: <Star size={'20px'} />
        }

    ]
    const mainMenuList = [
        {
            title: "Explore",
            icon: <Activity size={20} />
        },
        {
            title: "All",
            icon: <List size={20} />
        },
        {
            title: "Draft",
            icon: <Edit size={20} />
        },
        {
            title: "Pending",
            icon: <Clock size={20} />
        },
        {
            title: "Approved",
            icon: <Check size={20} />
        },
        {
            title: "Action Required",
            icon: <AlertCircle size={20} />
        }
    ]
    return (
        <Container fluid className='px-0'>
            <style>
                {
                    `
                    .menu_active{
                        border-bottom:solid 2px #000;
                    }
                    .menu_inactive{
                        border-bottom:solid 2px #fff;
                    }
                    .submenu_active{
                        background:#f8f8f8;
                    }
                    `
                }
            </style>
            <Card>
                <CardBody>
                    <h4 className="m-0">Templates</h4>


                </CardBody>
            </Card>

            <Card className='border position-relative '>
                <div className=' px-2 d-flex gap-5 py-1'>
                    {
                        mainMenuList.map((list, index) => (
                            <div onClick={() => setMainMenu(index + 1)} className={`px-1  d-flex justify-content-start align-items-center gap-1  cursor-pointer  ${index + 1 === MainMenu ? 'menu_active' : 'menu_inactive'} `} style={{ padding: '10px' }}>
                                {list.icon}
                                <h5 className='m-0 '>{list.title}</h5>
                            </div>
                        ))
                    }
                </div>
                <div className='position-absolute  end-0 me-3 mt-1'>
                    <button className='btn btn-primary'>Sync Status</button>
                </div>
            </Card>
            {
                MainMenu === 1 &&

                <div className="d-flex justtify-content-center align-items-start">
                    <div className="navHere" style={{ width: '350px', height: '100%', padding: '0px 20px 10px' }}>
                        <Card className='border-0'>
                            <CardBody>
                                <div className={`mb-2 d-flex justify-content-start align-items-center gap-1  cursor-pointer border-bottom`} style={{ padding: '10px' }}>
                                    <Home size={'20px'} />
                                    <h4 className='m-0'>All Templates</h4>
                                </div>

                                <div className={`mb-2`}>
                                    {
                                        submenuList.map((list, index) => (
                                            <div onClick={() => setSubMenu(index + 1)} className={`px-1 mt-1 d-flex justify-content-start align-items-center gap-1  cursor-pointer  rounded-2 ${index + 1 === SubMenu ? 'submenu_active' : ''} `} style={{ padding: '10px' }}>
                                                {list.icon}
                                                <h4 className='m-0 '>{list.title}</h4>
                                            </div>
                                        ))
                                    }
                                </div>
                            </CardBody>
                        </Card>

                    </div>
                    <div className="content_here w-100">
                        <Row className='match-height '>
                            <Card className='border-0'>
                                <CardBody>

                                    <Row className=''>
                                        {
                                            [1, 1, 1, 1, 1].map(() => (
                                                <Col md="6" >
                                                    <Card className="border" style={{ minHeight: "200px" }}>

                                                    </Card>
                                                </Col>
                                            ))
                                        }

                                    </Row>
                                </CardBody>
                            </Card>

                        </Row>
                    </div>
                </div>
            }
            {
                MainMenu !== 1 && <AllTemp/>
            }
        </Container>
    )
}
