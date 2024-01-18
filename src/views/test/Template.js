import React from 'react'
import { Home } from 'react-feather'
import { Card, CardBody, Container, Row } from 'reactstrap'

export default function Template() {
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
                <div className="navHere" style={{ width: '350px', height: '100%', padding: '0px 20px 10px' }}>
                    <Card>
                        <CardBody>

                            <div className={`mb-2 d-flex justify-content-start align-items-center gap-1 flash_themes cursor-pointeractive`} style={{ padding: '10px' }}>
                                <Home size={'20px'} />
                                <h4 className='m-0'>All Themes</h4>
                            </div>

                            <div className={`mb-2`} style={{ padding: '10px' }}>
                                <h4 className='m-0'>Purpose</h4>
                                <div className="checkboxs mt-1">


                                </div>
                            </div>

                            <div className={`mb-2`} style={{ padding: '10px' }}>

                            </div>

                            <div className={`mb-2`} style={{ padding: '10px' }}>

                            </div>
                        </CardBody>
                    </Card>

                    {/* <div key={key} className={`d-flex justify-content-start align-items-center gap-1 mt-2 flash_themes ${selectedFilter === "strategies" ? 'active' : ''}`} style={{padding: '10px'}} onClick={() => setSelectedFilter("strategies")}>
                        <a>Strategies</a>
                    </div> */}

                </div>
                <div className="content_here w-100">
                    <Row className='match-height '>
                            <Card>
                                <CardBody>
                                    <div className="text-center">
                                        <h4>Template not found</h4>
                                    </div>
                                </CardBody>
                            </Card>

                        </Row>
                </div>
            </div>
        </Container>
    )
}
