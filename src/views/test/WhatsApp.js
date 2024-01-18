/* eslint-disable no-unused-vars */
import './test.scss'
import React, { useState } from 'react'
import { Card, CardBody, Container, Col, Row } from 'react-bootstrap'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,

  Table
} from 'reactstrap'
// imgs
import verify from './img/verify.png'
import chat from './img/chat.jpg'

import { Edit, Info, Mail, PlayCircle } from 'react-feather'
import { Link } from 'react-router-dom'

export default function WhatsApp() {
  const [open, setOpen] = useState('999')
  const toggle = (id) => {
    if (open === id) {
      setOpen()
    } else {
      setOpen(id)
    }
  }

  const data = [
    {
      collection: "Dry Fruits",
      check: true,
      msg: "Checkout our Dryfruits here"
    },
    {
      collection: "Electronics",
      check: false,
      msg: "Explore the latest gadgets "
    },
    {
      collection: "Clothing",
      check: true,
      msg: "Discover trendy clothing options"
    },
    {
      collection: "Books",
      check: false,
      msg: "Dive into a world of knowledge"
    }
  ]

  return (
    <Container className='test' style={{ paddingBottom: "400px" }}>
      <style>
        {`
    .numDiv{
        width: 30px;
         height: 30px;
          background: #a5a5a5
    }
    .numDiv2{
        width: 30px;
         height: 30px;
          background: #626262
    }
  
  
    `}
      </style>
      <Card>
        <CardBody>
          <h3>Start Selling on WhatsApp</h3>
        </CardBody>
      </Card>

      <Card className='border-0'>
        <CardBody >
          <Accordion open={open} toggle={toggle} className='d-flex flex-column  gap-2 '>
            <AccordionItem className='border px-2 rounded-2 ' style={{ padding: "5px 0" }}>
              <AccordionHeader targetId="1" className=''>  <div className='numDiv d-flex justify-content-center  align-items-center rounded-5 text-white me-1 fs-5' >1</div>
                <div className="m-0 fs-4 text-black ">Add products to your Whatsapp Store</div></AccordionHeader>
              <AccordionBody accordionId="1" className='ms-2  '>
                <hr className='pt-1' />
                <div className='d-flex '>
                  <div>A.</div>
                  <div className='d-flex justify-content-between w-100'>
                    <div className='ms-1'>
                      <h1 className='fs-5 m-0 text-black fw-bold'>Provide Compliance Info</h1>
                      <p className='fs-6 m-0'>This will appear in your WhatsApp Profile</p>
                    </div>
                    <div className='text-end'>
                      <div className='d-flex '>
                        <img src={verify} width={20} alt="" />
                        <h6 className='fs-5 m-0 ms-1'>Submitted</h6>
                      </div>
                      <p className='fs-6 m-0'>update info</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className='d-flex '>
                  <div>B.</div>
                  <div className='d-flex justify-content-between w-100'>
                    <div className='ms-1'>
                      <h1 className='fs-5 m-0 text-black fw-bold'>Create FB Catalog with Shopify Products</h1>
                      <p className='fs-6 m-0'>Your Shopify products should be available to the Interakt Sales Channel</p>
                    </div>
                    <div className='text-end'>
                      <div className='d-flex justify-content-end '>
                        <img src={verify} width={20} alt="" />
                        <h6 className='fs-5 m-0 ms-1'>whats  store ready</h6>
                      </div>
                      <p className='font-small-2 m-0 text-danger'>Disconnet Catalog</p>
                      <p className='fs-6 m-0 '>FB Catalog Name: Interakt Dunodie</p>
                      <p className='fs-6 m-0 '>Foods</p>
                    </div>
                  </div>
                </div>

                <div className=' d-flex justify-content-center  align-items-center '>
                  <div className='border border-success text-center px-2' style={{ minWidth: "400px", padding: "8px 0", background: "#28c76f40" }}>
                    <p className='fs-6 m-0 text-black' >You are all set to start sending Catalog Messages!</p>
                  </div>
                </div>
                <div className=' border rounded-2 px-2 mt-1 ' style={{ padding: "8px 0" }}>
                  <p className='fs-6 m-0 text-black fw-bold' >ALTERNATIVE: You can manually create a FB catalog & connect it</p>
                </div>
              </AccordionBody>
            </AccordionItem>

            <AccordionItem className='border px-2 rounded-2 ' style={{ padding: "5px 0" }}>
              <AccordionHeader targetId="2" className=''>
                <div className='numDiv d-flex justify-content-center  align-items-center rounded-5 text-white me-1 fs-5' >2</div>
                <div className="m-0 fs-4 text-black ">Setup Messages for Product Collections & Catalogs</div></AccordionHeader>
              <AccordionBody accordionId="2" className='ms-2  '>
                <hr className='pt-1' />
                <div className=' '>
                  <div className='d-flex justify-content-between w-100'>
                    <div className=''>
                      <p className='fs-6 m-0 text-black'>You can send upto 10 of your collections as List Messages. If your customer clicks on a collection, 30 products from that collection will be sent to the customer automatically as a catalog message. <PlayCircle size='17' /></p>
                    </div>
                  </div>
                  <div className=' text-center px-md-5 py-md-2'>
                    <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*qYCI0wAEp80OLltbSCxXnA.png   " alt="" srcset="" className=' img-fluid ' />
                  </div>
                  <div className='border rounded-2  mt-3 '>
                    <Table responsive className='  '>
                      <thead >
                        <tr className='p-2'>
                          <th className='bg-white py-2'>
                            Shopify Collections
                          </th>
                          <th className='bg-white py-2'>
                            Include in Top 10?
                          </th>
                          <th className='bg-white py-2'>
                            Set Catalog Message for every collection
                          </th>
                        </tr>
                      </thead>
                      <tbody style={{ maxHeight: "300px", overflowY: "scroll" }} >
                        {
                          data.map((item, index) => {
                            return (
                              <tr className='p-1 py-2'>
                                <td style={{ width: "200px" }} className=''>
                                  {index + 1}. {item.collection}
                                </td>
                                <td className='' style={{ width: "150px" }}>
                                  <div className="form-check-success form-switch">
                                    <input className="form-check-input cursor-pointer" id={`verify_$`} defaultChecked={item.check} type="checkbox" role="switch" />
                                  </div>
                                </td>
                                <td style={{ width: "300px" }}>
                                  <div className='border rounded-1 d-flex justify-content-between  ' style={{ padding: "5px 10px" }}>
                                    <p className='m-0'>
                                      {item.msg}
                                    </p>
                                    <span>
                                      <Edit size={15} />
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        }

                      </tbody>
                    </Table>
                  </div>

                  <div className='mt-3 '>
                    <div className="m-0 fs-6 text-black text-center border py-1 px-2 rounded-1" style={{ width: "400px", background: "#e8e8e8" }}>Add products to your Whatsapp Store</div>
                  </div>
                </div>

              </AccordionBody>
            </AccordionItem>

            <AccordionItem className='border px-2 rounded-2 ' style={{ padding: "5px 0" }}>
              <AccordionHeader targetId="3" className=''>  <div className='numDiv d-flex justify-content-center  align-items-center rounded-5 text-white me-1 fs-5' >3</div>
                <div className="m-0 fs-4 text-black ">Send out Catalogs in Campaigns</div></AccordionHeader>
              <AccordionBody accordionId="3" className='ms-2  '>
                <hr className='pt-1' />
                <div className=''>
                  <div className=''>
                    <p className='fs-6 m-0 text-black'>After your campaign message, add an automatic catalog flow: if the customer clicks on the Quick Reply Button in your campaign message, the Product Collections List Message will go out automatically. If the customer then selects a collection from the list, the corresponding product catalog will go out instantly as a catalog message. <PlayCircle size='17' /></p>
                  </div>
                  <div className='mt-3'>
                    <button className='btn btn-primary px-3'> Setup</button>
                  </div>
                </div>

              </AccordionBody>
            </AccordionItem>

            <AccordionItem className='border px-2 rounded-2 ' style={{ padding: "5px 0" }}>
              <AccordionHeader targetId="4" className=''>  <div className='numDiv d-flex justify-content-center  align-items-center rounded-5 text-white me-1 fs-5' >4</div>
                <div className="m-0 fs-4 text-black ">Send out Catalogs in Auto Replies</div></AccordionHeader>
              <AccordionBody accordionId="4" className='ms-2  '>
                <hr className='pt-1' />
                <div className=''>
                  <div className=''>
                    <p className='fs-6 m-0 text-black'>Attach your Product Collections List in your Welcome/000/Delayed Messages! As soon as the Customer selects a Collection, products in that Collection will automatically go out as a Catalog! <PlayCircle size='17' /></p>

                  </div>
                  <div className='mt-3'>
                    <button className='btn btn-primary px-3'> Setup</button>
                  </div>
                </div>

              </AccordionBody>
            </AccordionItem>

            <AccordionItem className='border px-2 rounded-2 ' style={{ padding: "5px 0" }}>
              <AccordionHeader targetId="5" className=''>  <div className='numDiv d-flex justify-content-center  align-items-center rounded-5 text-white me-1 fs-5' >5</div>
                <div className="m-0 fs-4 text-black ">Help customers checkout on Shopify <span className='text-white px-1 rounded-1 bg-success' style={{ padding: '5px 0' }}> New!</span></div></AccordionHeader>
              <AccordionBody accordionId="5" className='ms-2  '>
                <hr className='pt-1' />
                <Row className=''>
                  <Col md="7" className=''>
                    <p className='fs-6 m-0 text-black'>As soon as you receive a WhatsApp Cart from your customer, automatically send a Shopify Cart Link with the same products <PlayCircle size='17' /></p>

                    <div className='mt-3'>
                      <h4><Mail size='20' className='me-1' />Checkout Template <Link to='' className='fs-6'>Change</Link> <Info size='20' /></h4>
                      <div className='mt-2 border rounded-3 p-2 ' >
                        <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
                          <div>
                            <h4 >Header:</h4>
                            <h6>Your cart is ready!</h6>
                          </div>
                          <div className='mt-2'>
                            <h4>Body:</h4>
                            <h6>Hey {(1)}</h6>
                          </div>

                          <div className='mt-2'>
                            <p className='fs-6'>We have created a cart for you on our website with your sofected items Click on the button below and place your order.</p>
                          </div>
                          <div className='mt-2'>
                            <h4>Buttons:</h4>
                            <h6>Place Orders</h6>
                          </div>
                          <div className='mt-2'>
                            <p className='fs-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam explicabo et odio repudiandae, doloribus libero ipsa non inventore repellendus. Dicta qui sint voluptates itaque ullam expedita esse veritatis cum sit?</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    <button className='btn btn-danger rounded-1 mt-2 '>Disable Auto Checkout Message</button>

                  </Col>
                  <Col md="5" className=' text-center'>
                    <img src={chat} alt="" width={230} />
                  </Col>
                  <p className='fs-6 mt-2'>NOTE: The wil work if you have synced your Shopify products to Fronts What Chanel Apoo the Gales Channel in Shopify if you have synced the products via Google Sloan Party polyp you will need to ansare that the content of the 'sarlant ist for every prodat in Reply</p>

                </Row>

              </AccordionBody>
            </AccordionItem>

            <AccordionItem className='border px-2 rounded-2 noArrow' style={{ padding: "5px 0" }}>
              <AccordionHeader targetId="999" className='  '>
                <div className='numDiv d-flex justify-content-center  align-items-center rounded-5 text-white me-1 fs-5' >6</div>
                <div className="m-0 fs-4 text-black ">See all enquiries & orders you get from customers</div>
                <span className='ms-auto'>Coming Soon</span>
              </AccordionHeader>

            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>

    </Container>
  )
}
