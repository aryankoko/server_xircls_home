import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { validForm } from '../../Validator'
import { postReq } from '../../../assets/auth/jwtService'

function Project() {
    const [data, setData] = useState({
        projectName: ""
    })
    const [useStatus, setStatus] = useState()
    const [useShowStatus, setShowStatus] = useState(false)

    const formValuesCheck = [
        {
            name: 'projectName',
            message: 'Enter Project Name',
            type: 'string',
            id: 'projectName'
        }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        {
            setData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }))
        }
    }
    const checkStatus = () => {
        const newformData = new FormData()
        setShowStatus(true)
        // fetch('https://daf4-2402-e280-3d9c-20d-a5e9-6dbd-1388-ddc3.ngrok-free.app/fbVerification/', {
        //     method: 'POST',
        //     body: newformData
        // })
        
        postReq('fbVerification', newformData)
            .then((res) => {
                console.log(res)
                setStatus({
                    active:res.fb_status,
                    msg:res.message
                })
            })
            .catch((err) => {
                toast.alert("Something went wrong!")
                console.log(err)
            })
    }

    const postData = async (e) => {
        e.preventDefault()
        console.log(data)
        postReq('projectCreation', data)
        .then(res => {
            console.log(res)
            checkStatus()
            })
            .catch((error) => {
              if (error.response && error.response.status === 500) {
                  // Handle 500 error
                  toast.error('Internal Server Error')
              } else {
                  // Handle other errors
                  console.log(error)
              }
          })
     
    }

    const handleSubmit = (e) => {
        const checkForm = validForm(formValuesCheck, data)
        if (checkForm) {
            postData(e)
        }
    }

    return (
        <Container>
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardBody>
                            <div className='title'>
                                <h4>Create Project</h4>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardBody>
                            <Form >
                                <FormGroup>
                                    <Label for="projectName">Project Name</Label>
                                    <Input name='projectName' id='projectName' placeholder='Enter Project Name' type='text' value={data.projectName} onChange={handleChange} />
                                    <p id="projectName_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </FormGroup>
                                <div className={useShowStatus ? 'd-block' : 'd-none'}>
                                    <div className='d-flex gap-2 align-items-center  '>
                                        <h4 className=' m-0'>Status : </h4> <h4 className={`border px-2 m-0  rounded-2  text-white ${useStatus?.active ? "bg-success" : "bg-danger"}`} style={{ padding: "8px 0" }}>{useStatus?.active ? "Active" : "Inactive"}</h4>
                                    </div>
                                        <h6 className=' mt-1'>{useStatus?.msg} </h6> 
                                </div>
                            </Form>
                            <div className='d-flex justify-content-end align-items-end'>
                                <Button Button type="submit" className='btn-primary' onClick={(e) => handleSubmit(e)}>Submit</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Project