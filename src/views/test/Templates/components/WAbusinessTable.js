/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import AdvanceServerSide from '../../../Components/DataTable/AdvanceServerSide'

export default function WAbusinessTable() {
    const [isLoading, setIsLoading] = useState(true)
    const [tableData, settableData] = useState(null)
    const [total, settotal] = useState(0)

    const columns = [
        {
            name: 'Display Name',
            minWidth: '200px',
            selector: row => row.name, // Assuming 'name' is the property in your data for the name
            dataType: 'email',
            type: 'text',
            isEnable: true
        },
        {
            name: 'Currency',
            minWidth: '15%',
            selector: row => row.currency, // Assuming 'category' is the property in your data for the category
            type: 'select',
            isEnable: true
        },

        {
            name: (<div className='mt-1 '>
                <>Whatsapp Business Status </>
                <p className=' fw-lighter m-0'>(Approval from meta)</p>
            </div>),
            minWidth: '10%',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-start align-items-start flex-column'>
                        <span className='text-success'>{row.account_review_status === 'APPROVED' && "APPROVED"}</span>
                        <span className='text-danger'>{row.account_review_status === 'REJECTED' && "REJECTED"}</span>
                    </div>
                )
            },
            isEnable: true
        },
        {
            name: 'Facebook Business Status',
            minWidth: '10%',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-start align-items-start flex-column'>
                        <span className='text-success'>{row.business_verification_status === 'verified' && "Verified"}</span>
                        <span className='text-danger'>{row.business_verification_status === 'not_verified' && "Not Verified"}</span>
                    </div>
                )
            },
            isEnable: true
        }
    ]
    const dummydata = [
        {
            id: "198633316664135",
            account_review_status: "APPROVED",
            business_verification_status: "verified",
            currency: "INR",
            message_template_namespace: "82fa975b_5d60_4ad8_8506_101cb2efe746",
            name: "XIRCLS (AiSensy)",
            on_behalf_of_business_info: {
                name: "Xircls- The world's First Collaborative Marketing Network",
                id: "666014908139771",
                status: "APPROVED",
                type: "SELF"
            },
            ownership_type: "CLIENT_OWNED",
            primary_funding_id: "6894446444004683",
            timezone_id: "71"
        }
    ]

    const getData = () => {
        setIsLoading(true)
        axios.get('https://254c-2405-201-7-8937-7011-cd56-9600-10f0.ngrok-free.app/getWABAInformation/')
            .then(response => {
                // Handle the successful response here
                console.log('Response:', response.data)
                settableData(response.data.data)
                setIsLoading(false)
                settotal(response.data.total)

            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error)
                setIsLoading(false)
            })
    }

    return (
        <Card>
            <CardBody>

                <AdvanceServerSide
                    tableName="WhatsApp Business"
                    tableCol={columns}
                    data={dummydata}
                    count={total}
                    getData={getData}
                    isLoading={isLoading}
                    advanceFilter={true}

                />
            </CardBody>
        </Card>
    )
}
