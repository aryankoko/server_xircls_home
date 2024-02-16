import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { validForm } from '../../../Validator'

function Project() {
    const [data, setData] = useState({
        projectName: ""
    })

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

    const postData = async (e) => {
        e.preventDefault()
        console.log(data)
        try {
            const response = await fetch('https://3a04-2405-201-7-8937-ad97-9647-754f-d215.ngrok-free.app/projectCreation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const responseData = await response.json()
                console.log(responseData, "responseData")
                if (responseData === false) {
                    toast.error("Project already exists")
                }
                console.log('Data submitted successfully!')
                // console.log(response.json())
            } else {
                console.error('Error submitting data:', response.statusText)

            }
        } catch (error) {
            console.error('Error:', error.message)
        }
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