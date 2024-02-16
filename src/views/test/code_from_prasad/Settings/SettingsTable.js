import React, { useEffect, useState } from 'react'
import ComTable from '../../../Components/DataTable/ComTable'
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap'
import { FaPlus } from "react-icons/fa6"
import { Link } from 'react-router-dom'


function SettingsTable() {
  const [searchValue, setSearchValue] = useState('')
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredData, setFilteredData] = useState([])


  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = tableData.filter(item => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  const data = async () => {
    try {
      const response = await fetch('https://3a04-2405-201-7-8937-ad97-9647-754f-d215.ngrok-free.app/getTemplates/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        console.log('Data submitted successfully!')
        const responseData = await response.json()
        // console.log("abc", responseData.data, setFilteredData, setSearchValue)
        setTableData(responseData.data)
        setIsLoading(false)
      } else {
        console.error('Error submitting data:', response.statusText)

      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  useEffect(() => {
    data()
  }, [])


  const defferContent =
    <>
      {/* <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Templates</h4>
      </Col>
      <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
        <Input
          className='dataTable-filter form-control ms-1'
          style={{ width: `180px`, height: `2.714rem` }}
          type='text'
          bsSize='sm'
          id='search-input-1'
          placeholder='Search...'
          value={searchValue}
          onChange={handleFilter}
        />
      </Col> */}

      <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Templates</h4>
      </Col>
      <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
        <Link className='btn btn-primary-main' to=''>Create New</Link>
        <Input
          className='dataTable-filter form-control ms-1'
          style={{ width: `180px`, height: `2.714rem` }}
          type='text'
          bsSize='sm'
          id='search-input-1'
          placeholder='Search...'
          value={searchValue}
          onChange={handleFilter}
        />
      </Col>
    </>
  const columns = [
    {
      name: 'Sr No.',
      cell: (row, index) => index + 1,
      width: '10%'
    },
    {
      name: 'Name',
      selector: row => row.name
    },
    {
      name: 'Status',
      selector: row => row.status
    },
    {
      name: 'language',
      selector: row => row.language
    },
    {
      name: 'Category',
      selector: row => row.category
    }
  ]
  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ComTable
                tableName=""
                content={defferContent}
                tableCol={columns}
                data={tableData}
                searchValue={searchValue}
                filteredData={filteredData}
                isLoading={isLoading}
                handleFilter={handleFilter}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default SettingsTable