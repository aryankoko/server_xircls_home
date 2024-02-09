/* eslint-disable no-unused-vars */
import moment from 'moment'
import React, { useState } from 'react'
import { Copy, Edit3, Eye, Trash2 } from 'react-feather'
import { Card, CardBody } from 'reactstrap'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'
import { Link } from 'react-router-dom'
// import AdvanceServerSide from '../../../Components/DataTable/AdvanceServerSide'

export default function CodeUserData() {
    const [tableData, settableData] = useState(null)
    const [showUserDetails, setshowUserDetails] = useState(false)

    const columns = [
        {
            name: 'Date',
            sortable: true,
            minWidth: '100px',
            selector: row => moment(row?.created_at ? row?.created_at : "").format('YYYY-MM-DD')
          },
          {
            name: 'Time',
            sortable: true,
            minWidth: '100px',
            selector: row => moment(row?.created_at ? row?.created_at : "").format('HH:mm:ss')
          },
        {
            name: 'Email',
            minWidth: '200px',
            selector: row => row.email, // Assuming 'category' is the property in your data for the category
            dataType: 'email',
            type: 'text',
            isEnable: true
        },
        {
            name: 'Results',
            minWidth: '200px',
            selector: row => <Link to={`/codeskin-user/${row.unique_id}`} className='text-primary'>View</Link>,
            isEnable: true
        }

    ]

    const getData = () => {

        fetch('https://apps.xircls.com/leads/lead_form_data/', {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                // Handle the successful response here
                console.log('Response:', data)
                settableData(data)
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error)
            })
    }


    return (
        <>
            <Card>
                <CardBody>

                    <AdvanceServerSide
                        tableName="All Templates"
                        tableCol={columns}
                        data={tableData}
                        count={10}
                        getData={getData}
                        isLoading={false}
                        advanceFilter={true}

                    />
                </CardBody>
            </Card>
        </>

    )
}
