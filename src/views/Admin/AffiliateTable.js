import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BookOpen, DollarSign, MoreVertical } from 'react-feather'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, Row, UncontrolledButtonDropdown } from 'reactstrap'
import { baseURL } from '../../assets/auth/jwtService'
import ComTable from '../Components/DataTable/ComTable'

import NavbarAdmin from './NavbarAdmin'

export default function AffiliateTable() {
  const navigate = useNavigate()
  const [tableList, setTableList] = useState([])
  const [searchFilter, setSearchFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState({})
  const [withdrawalUserID, setWithdrawalUserID] = useState()

  const [commission, setCommission] = useState({
    value: 0,
    value_type: "Percent"
  })

  const [comModal, setComModal] = useState(false)

  const filteredArray = tableList?.filter(cur => (cur.firstname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.lastname?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.personal_email?.toLowerCase()?.includes(searchFilter.toLowerCase())))

  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>Affiliates</h4>
    </Col>
    <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
      <input value={searchFilter} onChange={e => setSearchFilter(e.target.value)} type="text" placeholder="Search..." className='form-control ms-1' style={{ width: "200px" }} />
    </Col>
  </>

  const columns = [
    {
      name: 'First Name',
      minWidth: '150px',
      selector: row => row.firstname
    },
    {
      name: 'First Name',
      minWidth: '150px',
      selector: row => row.lastname
    },
    {
      name: 'Email',
      minWidth: '150px',
      selector: row => row.personal_email
    },
    // {
    //     name: 'Action',
    //     minWidth: '150px',
    //     selector: (row) => <PlusCircle onClick={() => {
    //         setSelectedUser(row)
    //         setComModal(true)
    //     }} className='cursor-pointer' size={14} />
    // },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <UncontrolledButtonDropdown className='more-options-dropdown'>
            <DropdownToggle className={`btn-icon cursor-pointer`} color='transparent' size='sm'>
              <span className={`border-none`}>
                <MoreVertical size={15} />
              </span>
            </DropdownToggle>
            <DropdownMenu className='border dropdown-menu-custom'>
              <DropdownItem className='w-100' onClick={() => {
                setSelectedUser(row)
                setComModal(true)
              }}>
                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                  <DollarSign stroke='#ea5455' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Commission</span>
                </div>
              </DropdownItem>
              <DropdownItem className='w-100'
                onClick={() => {
                  navigate("/merchant/WithdrawalTransaction/", { state: { withdrawalUserID: row.id } })
                }}
              >
                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                  <BookOpen stroke='#28c76f' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Withdrawal Transaction</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div >
      ),
      width: "100px"
    }
  ]

  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseURL}/affiliate/affiliate_person_all`
    }).then((data) => {
      setTableList(data?.data?.affiliate_person ? data?.data?.affiliate_person : [])
      setIsLoading(false)
    }).catch((error) => {
      console.log("error", error)
      setIsLoading(false)
    })
  }, [])
  console.log(withdrawalUserID, setWithdrawalUserID)
  return (
    <div>
      <div className='d-flex align-items-center justify-content-between p-2 text-center' style={{ height: "vh", width: "100%", backgroundColor: "#7367F0" }}>
        <h1 style={{ color: "white", textAlign: "center", marginLeft: "30px" }} className='d-flex align-items-center '>Affiliates</h1>
        <NavbarAdmin />
      </div>

      <Row className='px-5 justify-content-center mt-5'>
        <Col lg="10" className='  ' style={{background:"white"}}>
       
        <ComTable
          content={defferContent}
          tableCol={columns}
          data={tableList}
          searchValue={searchFilter}
          filteredData={filteredArray}
          isLoading={isLoading}
        />

        <Modal isOpen={comModal} size="md" toggle={() => setComModal(false)}>
          <ModalBody className="position-relative">
            <div className="p-1 position-absolute top-0 end-0">
              <RxCross2 size={20} onClick={() => setComModal(false)} style={{ cursor: "pointer" }} />
            </div>
            <h4>Commision: {selectedUser?.personal_email}</h4>
            <div className='d-flex gap-2 mb-2'>
              <div className='flex-grow-1'>
                <label htmlFor="value_type">Type</label>
                <select value={commission?.value_type} onChange={e => {
                  setCommission({ ...commission, value_type: e.target.value, value: (e.target.value === "Percent" && Number(commission.value) > 100) ? 100 : Number(commission.value) })
                }} name="value_type" id="value_type" className="form-select">
                  <option value={"Percent"}>Percent(%)</option>
                  <option value={"Flat"}>Flat($)</option>
                </select>
              </div>
              <div className='flex-grow-1'>
                <label htmlFor="value">Value</label>
                <input value={commission?.value} onChange={e => {
                  if (!isNaN(e.target.value)) {
                    setCommission({ ...commission, value: (commission?.value_type === "Percent" && Number(e.target.value) > 100) ? 100 : Number(e.target.value) })
                  }
                }} name="value" id="value" className="form-control" />
              </div>
            </div>
            <button onClick={() => {
              setComModal(false)
              const form_data = new FormData()
              form_data.append("affiliate_person_id", selectedUser?.id)
              form_data.append("value", commission?.value)
              form_data.append("value_type", commission?.value_type)
              const url = new URL(`${baseURL}/affiliate/affiliate_commission/`)
              axios({
                method: "POST",
                data: form_data,
                url
              }).then((res) => {
                console.log({ res })
                toast.success("Sent successfully")
              }).catch((error) => {
                console.log({ error })
                toast.success("Couldn't send the data")
              })
            }} className='btn btn-primary'>Save</button>
          </ModalBody>
        </Modal>
        </Col>
      </Row>

    </div>
  )
}
