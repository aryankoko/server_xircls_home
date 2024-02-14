/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
   Card, CardBody, Col, Container, Row, Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter

} from 'reactstrap'
import { BsFire } from "react-icons/bs"
import { CiCloud } from "react-icons/ci"
import { Activity, List, Edit, Clock, Check, AlertCircle, Home, Star, Phone, ExternalLink, CornerDownLeft } from 'react-feather'
import AllTempTable from './pages/AllTempTable'
import wp_back from '../imgs/wp_back.png'
import { postReq } from '../../../../assets/auth/jwtService'
import FrontBaseLoader from '../../../Components/Loader/Loader'
import toast from 'react-hot-toast'


export default function TemplateUI() {

   const [useLoader, setLoader] = useState(true)
   const [MainMenu, setMainMenu] = useState(1)
   const [SubMenu, setSubMenu] = useState(1)
   const [AllTemplatesData, setAllTemplatesData] = useState([])
   const [modal, setModal] = useState(false)
   const [CurrentTemplate, setCurrentTemplate] = useState()
   const [CurrentTemplate_UI, setCurrentTemplate_UI] = useState()
   const [BodyParameterList, setBodyParameterList] = useState([])
   const [HeaderParameterList, setHeaderParameterList] = useState(null)
   const [testPhone, settestPhone] = useState('')


   const toggle = () => setModal(!modal)
   const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
      setLoader(true)
      // Create a new FormData object and append the searchValue
      const formData = new FormData()

      Object.entries(advanceSearchValue).map(([key, value]) => value && formData.append(key, value))
      formData.append("slug", "customer_data")
      formData.append("page", currentPage + 1)
      formData.append("size", currentEntry)
      formData.append("searchValue", searchValue)


      fetch('https://8855-2402-e280-3d9c-20d-cf6e-626b-8cb3-5e9.ngrok-free.app/getTemplates/', {
         method: 'POST',
         body: formData
      })
         .then(response => {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
         })
         .then(data => {
            // Handle the successful response here
            console.log('Response:', data.data)
            setAllTemplatesData(data.data)
            setLoader(false)
         })
         .catch(error => {
            // Handle errors here
            console.error('Error:', error)
         })
   }
   useEffect(() => {
      getData()
   }, [])

   // get current template
   const getCurrentTemplate = (templateId) => {
      setBodyParameterList([])
      setHeaderParameterList(null)
      const formData = new FormData()
      formData.append("templateId", templateId)

      fetch('https://8855-2402-e280-3d9c-20d-cf6e-626b-8cb3-5e9.ngrok-free.app/getTemplateById/', {
         method: 'POST',
         body: formData
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
            setCurrentTemplate(data)
            console.log(data.components[0].format)


            setModal(true)
         })
         .catch(error => {
            // Handle errors here
            console.error('Error:', error)
         })
   }

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

   const updateDisplayedMessage = (inputString, defData) => {
      let updatedMessage = inputString
      updatedMessage = updatedMessage.replace(/\*(.*?)\*/g, (_, p1) => `<strong>${p1}</strong>`)
      updatedMessage = updatedMessage.replace(/_(.*?)_/g, (_, p1) => `<em>${p1}</em>`)
      updatedMessage = updatedMessage.replace(/~(.*?)~/g, (_, p1) => `<del>${p1}</del>`)
      if (defData.example) {
         const data = defData.example.body_text[0]
         updatedMessage = inputString.replace(/{{(\d+)}}/g, (match, index) => {
            return `[${data[index - 1]}]`
         })
      }

      return updatedMessage
   }
   const updateDisplayedMessage2 = (inputString, defData) => {
      let updatedMessage = inputString
      updatedMessage = updatedMessage.replace(/\*(.*?)\*/g, (_, p1) => `<strong>${p1}</strong>`)
      updatedMessage = updatedMessage.replace(/_(.*?)_/g, (_, p1) => `<em>${p1}</em>`)
      updatedMessage = updatedMessage.replace(/~(.*?)~/g, (_, p1) => `<del>${p1}</del>`)

      if (defData.example) {

         const data = defData.example.body_text[0]
         const data2 = HeaderParameterList
         updatedMessage = inputString.replace(/{{(\d+)}}/g, (match, index) => {
            try {
               return `[${data2[index - 1]}]`

            } catch (error) {
               return `[${data[index - 1]}]`

            }
         })
      }

      return updatedMessage
   }
   const parameterInput = (type, value, index) => {

      if (type === 'header') {
         setHeaderParameterList(value)
         console.log(value)
      } else {
         const oldpr = BodyParameterList
         oldpr[index] = value

         setBodyParameterList(oldpr)
      }

   }

   useEffect(() => {
   }, [])

   const sendTemplate = () => {

      const formData = new FormData()

      if (HeaderParameterList) {
         const header_variables = [
            {
               type: "text",
               text: HeaderParameterList
            }
         ]
         formData.append("header_variables", JSON.stringify(header_variables))
         formData.append("type", "TEXT")
      }
      if (!HeaderParameterList) {
         formData.append("type", "BODY")
      }
      console.log(CurrentTemplate.components[0].format)
      if (CurrentTemplate.components[0].format === "IMAGE") {
         formData.append("type", "IMAGE")
         formData.append("link", CurrentTemplate.components[0].example.header_handle[0])
      }
      if (CurrentTemplate.components[0].format === "VIDEO") {
         formData.append("type", "VIDEO")
         formData.append("link", CurrentTemplate.components[0].example.header_handle[0])
      }
      if (CurrentTemplate.components[0].format === "DOCUMENT") {
         formData.append("type", "DOCUMENT")
         formData.append("link", CurrentTemplate.components[0].example.header_handle[0])
      }

      const body_variables = BodyParameterList.map(text => ({
         type: "text",
         text
      }))
      formData.append("language", CurrentTemplate.language)
      formData.append("template_name", CurrentTemplate.name)
      formData.append("phone", testPhone)
      formData.append("body_variables", JSON.stringify(body_variables))


      fetch('https://8855-2402-e280-3d9c-20d-cf6e-626b-8cb3-5e9.ngrok-free.app/sendMessage/', {
         method: 'POST',
         body: formData
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
            if (data.messages[0].message_status === "accepted") {
               toast.success("Message has sent!")
            } else if (data.code) {
               toast.error("Please try again")

            }
         })
         .catch(error => {
            // Handle errors here
            console.error('Error:', error)
         })
   }

   const delTemplate = (name) => {
      const formData = new FormData()
      formData.append("template_name", name)
      fetch('https://8855-2402-e280-3d9c-20d-cf6e-626b-8cb3-5e9.ngrok-free.app/deleteTemplate/', {
         method: 'POST',
         body: formData
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
            toast.error("Template deleted")
            getData()
         })
         .catch(error => {
            // Handle errors here
            console.error('Error:', error)
         })
   }
   return (
      <Container fluid className='px-0'>
         {
            useLoader && <FrontBaseLoader />

         }
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

                           <Row className='match-height'>
                              {

                                 AllTemplatesData.map((SigleTemplate) => {

                                    return (

                                       <Col md="6" xxl="4" >
                                          <Card className="border-0 p-2 position-relaive  shadow-lg pe-5" style={{ background: "#c2c2c2", backgroundImage: `url(${wp_back})`, gap: "5px", maxWidth: "500px" }} >

                                             <div className="border-1 rounded-3 mb-0 whatsapp_template_card" >
                                                <div className='p-0' >
                                                   {

                                                      SigleTemplate.components.map((data, index) => {
                                                         if (data.format === "TEXT") {
                                                            return (
                                                               <div className='p-1 pb-0'  >
                                                                  <h6 className='fs-4 text-black bolder mb-1 '>{data.text}</h6>
                                                               </div>
                                                            )
                                                         }
                                                         if (data.format === "IMAGE") {
                                                            return (
                                                               <div className='p-1'  >
                                                                  <img className='rounded-3 img-fluid border-0 rounded w-100 object-fit-cover ' src={data.example.header_handle[0] ?? ""} alt="" />
                                                               </div>
                                                            )
                                                         }
                                                         if (data.format === "VIDEO") {
                                                            return (
                                                               <div className='p-1'  >
                                                                  <video className='rounded-3  object-fit-cover w-100' controls autoPlay mute style={{ height: "170px" }}>
                                                                     <source
                                                                        src={data.example.header_handle[0] ?? ""}
                                                                        type="video/mp4"
                                                                     />
                                                                     Video not supported.
                                                                  </video>
                                                               </div>
                                                            )
                                                         }
                                                         if (data.type === "BODY") {
                                                            return (
                                                               <div className='p-1 pe-2' >
                                                                  <p className='fs-6' dangerouslySetInnerHTML={{ __html: updateDisplayedMessage(data.text, data) }}></p>

                                                               </div>
                                                            )
                                                         }
                                                         if (data.type === "FOOTER") {
                                                            return (
                                                               <div className=' ps-1 pe-2 pt-0' >
                                                                  <p className='text-secondary font-small-3 mt-0'>{data.text} </p>
                                                               </div>
                                                            )
                                                         }
                                                         if (data.type === "BUTTONS") {
                                                            return data.buttons.map((data, index) => {
                                                               if (data.type === "URL") {
                                                                  return (
                                                                     <div className="border-top  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                                        <ExternalLink size={17} /><h6 className='m-0 text-primary' >{data.text}</h6>
                                                                     </div>
                                                                  )
                                                               }
                                                               if (data.type === "PHONE_NUMBER") {
                                                                  return (
                                                                     <div className="border-top  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                                        <Phone size={17} /><h6 className='m-0 text-primary' >{data.text}</h6>
                                                                     </div>
                                                                  )
                                                               }
                                                               if (data.type === "QUICK_REPLY") {
                                                                  return (
                                                                     <div className="border-top  bg-white rounded-bottom-3   d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                                        <CornerDownLeft size={17} /><h6 className='m-0 text-primary' > {data.text}</h6>
                                                                     </div>
                                                                  )
                                                               }
                                                            })
                                                         }


                                                      })
                                                   }

                                                </div>
                                             </div>

                                             <div className='mt-auto  '>
                                                <div className='mt-3  rounded-3 d-flex justify-content-evenly  '>
                                                   <button className=' border-0 px-1 bg-success text-white rounded-2'>{SigleTemplate.status}</button>
                                                   <button className='btn btn-primary' >Edit</button>
                                                   <button className='btn btn-primary' onClick={() => delTemplate(SigleTemplate.name)} >Delete</button>
                                                   <button className='btn btn-primary' onClick={() => getCurrentTemplate(SigleTemplate.id)}>Test</button>
                                                </div>
                                             </div>
                                          </Card>
                                       </Col>
                                    )

                                 })
                              }

                           </Row>
                        </CardBody>
                     </Card>

                  </Row>
               </div>

               {/* modal -------------------------*/}
               <Modal
                  isOpen={modal}
                  toggle={toggle}
                  backdrop={'static'}
                  size="lg"
               >
                  <ModalHeader toggle={toggle} className='border-bottom'>Template : {CurrentTemplate?.name && CurrentTemplate.name}</ModalHeader>
                  <ModalBody className='py-2'>
                     <Row className=' justify-content-center  align-items-center '>
                        <Col md="6" className=''>
                           <div className='px-3'>

                              {
                                 CurrentTemplate && CurrentTemplate.components.map((data, index) => {
                                    if (data.type === "HEADER" && data.format === "TEXT" && data.example) {
                                       // console.log(data.example.header_text)
                                       return (
                                          <div>
                                             <h3 className='mt-3 border-bottom'>Header</h3>
                                             {data.example.header_text && data.example.header_text.map((label, index) => {
                                                return (
                                                   <div className='mt-1' key={index}>
                                                      <h4 className="">{label}</h4>

                                                      <input
                                                         type="text"
                                                         className="form-control"
                                                         placeholder={label}
                                                         onChange={(e) => parameterInput('header', e.target.value, index)}
                                                      />
                                                   </div>
                                                )
                                             })}
                                          </div>
                                       )

                                    }
                                 })
                              }


                              {
                                 CurrentTemplate && CurrentTemplate.components.map((data, index) => {
                                    if (data.type === "BODY" && data.example) {
                                       return (
                                       <div>
                                          <h3 className='mt-3 mb-2 border-bottom'>Body</h3>
                                          {data.example.body_text[0].map((label, index) => {
                                             return (
                                                <div className='mt-1'>
                                                   <h4 className="">{label}</h4>

                                                   <input
                                                      type="text"
                                                      className="form-control "
                                                      placeholder={label}
                                                      onChange={(e) => parameterInput('body', e.target.value, index, data)}
                                                   />
                                                </div>
                                             )
                                          })}
                                       </div>)
                                    }

                                 })
                              }
                              <div className='mt-1'>
                                 <h4 className=" mt-3">Send to </h4>

                                 <input
                                    type="text"
                                    className="form-control "
                                    placeholder="95438xxxxx"
                                    onChange={(e) => settestPhone(e.target.value)}
                                 />
                              </div>
                           </div>

                        </Col>
                        <Col md="6"  >
                           <Card className="border-0 p-2 position-relaive  shadow-lg pe-5" style={{ background: "#c2c2c2", backgroundImage: `url(${wp_back})`, gap: "5px", maxWidth: "500px" }} >

                              <div className="border-1 rounded-3 mb-0 whatsapp_template_card" >
                                 <div className='p-0' >
                                    {
                                       CurrentTemplate && CurrentTemplate.components.map((data, index) => {

                                          if (data.format === "TEXT") {
                                             return (
                                                <div className='p-1'  >
                                                   <h6 className='fs-4 text-black bolder mb-1 '>{data.text}</h6>
                                                </div>
                                             )
                                          }
                                          if (data.format === "IMAGE") {
                                             return (
                                                <div className='p-1'  >
                                                   <img className=' img-fluid border-0 rounded w-100 object-fit-cover ' src={data.example.header_handle[0] ?? ""} alt="" />
                                                </div>
                                             )
                                          }
                                          if (data.format === "VIDEO") {
                                             return (
                                                <div className='p-1'  >
                                                   <video className='rounded-3  object-fit-cover w-100' controls autoPlay mute style={{ height: "170px" }}>
                                                      <source
                                                         src={data.example.header_handle[0] ?? ""}
                                                         type="video/mp4"
                                                      />
                                                      Video not supported.
                                                   </video>
                                                </div>
                                             )
                                          }
                                          if (data.type === "BODY") {

                                             return (
                                                <div className='p-1 pe-2' >
                                                   <p className='fs-6' dangerouslySetInnerHTML={{ __html: updateDisplayedMessage2(data.text, data) }}></p>

                                                </div>
                                             )
                                          }
                                          if (data.type === "FOOTER") {
                                             return (
                                                <div className='pt-1 ps-1 pe-2' >
                                                   <p className='text-secondary font-small-3'>{data.text} </p>
                                                </div>
                                             )
                                          }
                                          if (data.type === "BUTTONS") {
                                             return data.buttons.map((data, index) => {
                                                if (data.type === "URL") {
                                                   return (
                                                      <div className="border-top  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                         <ExternalLink size={17} /><h6 className='m-0 text-primary' >{data.text}</h6>
                                                      </div>
                                                   )
                                                }
                                                if (data.type === "PHONE_NUMBER") {
                                                   return (
                                                      <div className="border-top  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                         <Phone size={17} /><h6 className='m-0 text-primary' >{data.text}</h6>
                                                      </div>
                                                   )
                                                }
                                                if (data.type === "QUICK_REPLY") {
                                                   return (
                                                      <div className="border-top rounded-3 bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                         <CornerDownLeft size={17} /><h6 className='m-0 text-primary' > {data.text}</h6>
                                                      </div>
                                                   )
                                                }
                                             })
                                          }
                                       })
                                    }

                                 </div>
                              </div>

                              {/* {

                                 CurrentTemplate && CurrentTemplate.components.map((data, index) => {
                                    if (data.type === "BUTTONS") {
                                       return data.buttons.map((data, index) => {

                                          if (data.type === "QUICK_REPLY") {
                                             return (
                                                <div className="border rounded-3 bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                   <CornerDownLeft size={17} /><h6 className='m-0 text-primary' > {data.text}</h6>
                                                </div>
                                             )
                                          }
                                       })
                                    }

                                 })
                              } */}
                           </Card>
                        </Col>

                     </Row>
                  </ModalBody>
                  <ModalFooter>
                     <Button color="primary" onClick={sendTemplate}>
                        Send
                     </Button>{' '}
                     <Button color="secondary" onClick={toggle}>
                        Cancel
                     </Button>
                  </ModalFooter>
               </Modal>
            </div>
         }
         {
            MainMenu !== 1 && <AllTempTable />
         }
      </Container >
   )
}
