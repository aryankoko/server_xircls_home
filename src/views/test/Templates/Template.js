/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { BsFire } from "react-icons/bs"
import { CiCloud } from "react-icons/ci"
import { Activity, List, Edit, Clock, Check, AlertCircle, Home, Star, Phone, ExternalLink } from 'react-feather'
import AllTemp from './components/AllTemp'
import whatsapp from './imgs/whatsapp.png'
import wp_back from './imgs/wp_back.png'


export default function Template() {

   const [MainMenu, setMainMenu] = useState(1)
   const [SubMenu, setSubMenu] = useState(1)
   const [AllTemplatesData, setAllTemplatesData] = useState([])

   const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {

      // Create a new FormData object and append the searchValue
      const formData = new FormData()

      Object.entries(advanceSearchValue).map(([key, value]) => value && formData.append(key, value))
      formData.append("slug", "customer_data")
      formData.append("page", currentPage + 1)
      formData.append("size", currentEntry)
      formData.append("searchValue", searchValue)


      fetch('https://3a04-2405-201-7-8937-ad97-9647-754f-d215.ngrok-free.app/getTemplates/', {
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
         })
         .catch(error => {
            // Handle errors here
            console.error('Error:', error)
         })
   }
   useEffect(() => {
      getData()
   }, [])


   const dummydata = [
      {
         id: "387354853770491",
         category: "MARKETING",
         components: [
            {
               type: "HEADER",
               format: "IMAGE",
               example: {
                  header_handle: ["https://source.unsplash.com/random/800x600"]
               }
            },
            {
               type: "BODY",
               text: "*Final Hours to Go! Offer Ends Soon* 👋 {{1}}% Discount on Any purchase | It's Time to Action 💥 Use Discount Code 👉 {{2}} & Get *{{3}} Discount* Expires Tonight ❗ 👉{{4}} 👉{{5}} 👉{{6}} Happy Shopping 🥳🥳"
            },
            {
               type: "FOOTER",
               text: "Reply STOP to Unsubscribe"
            },
            {
               type: "BUTTONS",
               text: "Visit",
               url: "https://www.google.com/",
               buttons: [
                  {
                     type: "URL",
                     text: "Visit",
                     url: "https://www.google.com/"
                  },
                  {
                     type: "QUICK_REPLY",
                     text: "What's your favorite color?"
                  }
               ]
            }
         ],
         language: "en",
         name: "ninth_temp",
         quality_score: {
            score: "UNKNOWN",
            date: 1706079540
         },
         rejected_reason: "NONE",
         status: "APPROVED"
      },
      {
         id: "123456789",
         category: "SALES",
         components: [
            {
               type: "HEADER",
               format: "IMAGE",
               example: {
                  header_handle: ["https://source.unsplash.com/random/800x600"]
               }
            },
            {
               type: "BODY",
               text: "Don't miss our special sale! 🛍️ Get up to {{1}}% off on selected items. Use code {{2}} at checkout. Limited stock available!"
            },
            {
               type: "FOOTER",
               text: "Visit our website for more details."
            },
            {
               type: "BUTTONS",
               text: "Shop Now",
               url: "https://www.example.com/shop",
               buttons: [
                  {
                     type: "URL",
                     text: "Shop Now",
                     url: "https://www.example.com/shop"
                  },
                  {
                     type: "QUICK_REPLY",
                     text: "What's your favorite food?"
                  }
               ]
            }
         ],
         language: "en",
         name: "sales_temp_1",
         quality_score: {
            score: "GOOD",
            date: 1706079550
         },
         rejected_reason: "NONE",
         status: "APPROVED"
      },
      {
         id: "987654321",
         category: "ANNOUNCEMENT",
         components: [
            {
               type: "HEADER",
               format: "IMAGE",
               example: {
                  header_handle: ["https://source.unsplash.com/random/800x600"]
               }
            },
            {
               type: "BODY",
               text: "Exciting announcement! 🎉 Join us for an exclusive event on {{1}}. Save the date and experience something special!"
            },
            {
               type: "FOOTER",
               text: "RSVP by responding to this message."
            },
            {
               type: "BUTTONS",
               text: "RSVP",
               url: "https://www.example.com/rsvp",
               buttons: [
                  {
                     type: "URL",
                     text: "RSVP",
                     url: "https://www.example.com/rsvp"
                  },
                  {
                     type: "QUICK_REPLY",
                     text: "What's your favorite hobby?"
                  }
               ]
            }
         ],
         language: "en",
         name: "announcement_temp_1",
         quality_score: {
            score: "EXCELLENT",
            date: 1706079560
         },
         rejected_reason: "NONE",
         status: "APPROVED"
      },
      {
         id: "135792468",
         category: "NEWSLETTER",
         components: [
            {
               type: "HEADER",
               format: "IMAGE",
               example: {
                  header_handle: ["https://source.unsplash.com/random/800x600"]
               }
            },
            {
               type: "BODY",
               text: "Stay informed with our latest newsletter! 📰 Read about the latest trends, updates, and exciting news in our industry."
            },
            {
               type: "FOOTER",
               text: "Subscribe to our newsletter for regular updates."
            },
            {
               type: "BUTTONS",
               text: "Subscribe",
               url: "https://www.example.com/newsletter",
               buttons: [
                  {
                     type: "URL",
                     text: "Subscribe",
                     url: "https://www.example.com/newsletter"
                  },
                  {
                     type: "QUICK_REPLY",
                     text: "What's your preferred reading genre?"
                  }, {
                     id: "246813579",
                     category: "EVENT",
                     components: [
                        {
                           type: "HEADER",
                           format: "IMAGE",
                           example: {
                              header_handle: ["https://source.unsplash.com/random/800x600"]
                           }
                        },
                        {
                           type: "BODY",
                           text: "Join us for a special event on {{1}}! 🎉 Experience live performances, interactive sessions, and more. Don't miss out!"
                        },
                        {
                           type: "FOOTER",
                           text: "Visit our website for event details."
                        },
                        {
                           type: "BUTTONS",
                           text: "Event Details",
                           url: "https://www.example.com/event",
                           buttons: [
                              {
                                 type: "URL",
                                 text: "Event Details",
                                 url: "https://www.example.com/event"
                              },
                              {
                                 type: "QUICK_REPLY",
                                 text: "What's your favorite type of event?"
                              }
                           ]
                        }
                     ],
                     language: "en",
                     name: "event_temp_1",
                     quality_score: {
                        score: "EXCELLENT",
                        date: 1706079580
                     },
                     rejected_reason: "NONE",
                     status: "APPROVED"
                  },
                  {
                     id: "112233445",
                     category: "WEEKLY_SPECIAL",
                     components: [
                        {
                           type: "HEADER",
                           format: "IMAGE",
                           example: {
                              header_handle: ["https://source.unsplash.com/random/800x600"]
                           }
                        },
                        {
                           type: "BODY",
                           text: "Check out our weekly special offers! 🌟 Get exclusive discounts on featured products every week."
                        },
                        {
                           type: "FOOTER",
                           text: "Visit our store for this week's specials."
                        },
                        {
                           type: "BUTTONS",
                           text: "Shop Now",
                           url: "https://www.example.com/specials",
                           buttons: [
                              {
                                 type: "URL",
                                 text: "Shop Now",
                                 url: "https://www.example.com/specials"
                              },
                              {
                                 type: "QUICK_REPLY",
                                 text: "What's your favorite type of product?"
                              }
                           ]
                        }
                     ],
                     language: "en",
                     name: "weekly_special_temp_1",
                     quality_score: {
                        score: "GOOD",
                        date: 1706079590
                     },
                     rejected_reason: "NONE",
                     status: "APPROVED"
                  },
                  {
                     id: "567890123",
                     category: "SURVEY",
                     components: [
                        {
                           type: "HEADER",
                           format: "IMAGE",
                           example: {
                              header_handle: ["https://source.unsplash.com/random/800x600"]
                           }
                        },
                        {
                           type: "BODY",
                           text: "Share your thoughts with us! 📋 Take our quick survey and help us improve your experience."
                        },
                        {
                           type: "FOOTER",
                           text: "Your feedback is valuable to us."
                        },
                        {
                           type: "BUTTONS",
                           text: "Take Survey",
                           url: "https://www.example.com/survey",
                           buttons: [
                              {
                                 type: "URL",
                                 text: "Take Survey",
                                 url: "https://www.example.com/survey"
                              },
                              {
                                 type: "QUICK_REPLY",
                                 text: "What topics interest you the most?"
                              }
                           ]
                        }
                     ],
                     language: "en",
                     name: "survey_temp_1",
                     quality_score: {
                        score: "EXCELLENT",
                        date: 1706079600
                     },
                     rejected_reason: "NONE",
                     status: "APPROVED"
                  }
               ]
            }
         ],
         language: "en",
         name: "newsletter_temp_1",
         quality_score: {
            score: "GOOD",
            date: 1706079570
         },
         rejected_reason: "NONE",
         status: "APPROVED"
      }
   ]


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
   function boldWordsInString(inputString) {
      // Use regular expression to find words enclosed in single asterisks
      const boldedString = inputString.replace(/\*(.*?)\*/g, (_, match) => `<span style="font-weight: bolder;">${match}</span>`)
      // Using dangerouslySetInnerHTML to render HTML tags
      return <p dangerouslySetInnerHTML={{ __html: boldedString }} />
   }


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

                           <Row className='match-height'>
                              {

                                 dummydata.map((SigleTemplate) => {

                                    return (

                                       <Col md="6" xxl="4" >
                                          <Card className="border-0 p-2 position-relaive  shadow-lg " style={{ background: "#c2c2c2", backgroundImage:`url(${wp_back})`, gap: "5px", maxWidth:"500px" }} >

                                             <Card className="border-1 mb-0 " style={{ minHeight: "200px" }}>
                                                <CardBody className='p-0' >
                                                   {

                                                      SigleTemplate.components.map((data, index) => {
                                                         if (data.format === "IMAGE") {
                                                            return (
                                                               <div className='p-1'  >
                                                                  <img className=' img-fluid border-0 rounded w-100 object-fit-cover ' src={data.example.header_handle[0] ?? ""} alt="" />
                                                               </div>
                                                            )
                                                         }
                                                         if (data.type === "BODY") {
                                                            return (
                                                               <div className='p-1 pe-2' >
                                                                  <h5 >{boldWordsInString(data.text)} </h5>
                                                               </div>
                                                            )
                                                         }
                                                         if (data.type === "FOOTER") {
                                                            return (
                                                               <div className='p-1 pe-2' >
                                                                  <h6 className='text-secondary'>{data.text} </h6>
                                                               </div>
                                                            )
                                                         }
                                                         if (data.type === "BUTTONS") {
                                                            return data.buttons.map((data, index) => {
                                                               if (data.type === "URL") {
                                                                  return (
                                                                     <div className="border-top  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                                        <ExternalLink size={17} /><h5 className='m-0 text-primary' >{data.text}</h5>
                                                                     </div>
                                                                  )
                                                               }
                                                            })
                                                         }


                                                      })
                                                   }

                                                </CardBody>
                                             </Card>

                                             {

                                                SigleTemplate.components.map((data, index) => {
                                                   if (data.type === "BUTTONS") {
                                                      return data.buttons.map((data, index) => {

                                                         if (data.type === "QUICK_REPLY") {
                                                            return (
                                                               <div className="border rounded-2 bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                                  <Phone size={17} /><h5 className='m-0 text-primary' > {data.text}</h5>
                                                               </div>
                                                            )
                                                         }
                                                      })
                                                   }

                                                })
                                             }
                                             {/* <div className="border rounded-2  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                                <Phone size={17} /><h5 className='m-0 text-primary' > Relax, it was me</h5>
                                                            </div>
                                                            <div className="border rounded-2  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                                                                <ExternalLink size={17} /><h5 className='m-0 text-primary' > Relax, it was me</h5>
                                                            </div> */}

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
            </div>
         }
         {
            MainMenu !== 1 && <AllTemp />
         }
      </Container>
   )
}
