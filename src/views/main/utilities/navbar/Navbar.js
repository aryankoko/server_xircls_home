import { useEffect, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { BsCodeSquare, BsReverseLayoutTextSidebarReverse } from "react-icons/bs"
import { IoIosArrowDown } from "react-icons/io"
import { PiCodeBlockLight } from "react-icons/pi"
import { TfiTarget } from "react-icons/tfi"
import { TiFlashOutline } from "react-icons/ti"
import { VscTarget } from "react-icons/vsc"
import { Link } from 'react-router-dom'
import "../../mainCustome.scss"
import logo from "../logo.png"
import "./navbar.scss"


export const productList = [
  {
    title: "SuperLeadz",
    desc: "Lead Generation  ",
    logo: <BsCodeSquare size={20} color='' className='text-dark' />,
    link: "/products/superleadz/lead-generation-nurturing-and-conversion"
  },
  {
    title: "Infiniti",
    desc: "Customer Acquisition & Loyalty",
    logo: <PiCodeBlockLight size={23} color='' className='text-dark' />,
    link: "/products/infiniti/customer-acquisition-and-loyalty/"
  },
  {
    title: "Semper fi",
    desc: "Customer Loyalty",
    logo: <TiFlashOutline size={23} color='' className='text-dark' />,
    link: "/products/semperfi/customer-loyalty/"
  },
  {
    title: "Sniper",
    desc: "Customer Acquisition",
    logo: <TfiTarget size={20} color='' className='text-dark' />,
    link: "/products/sniper/customer-acquisition/"
  },
  {
    title: "Flash Accounts",
    desc: "dummy content",
    logo: <TfiTarget size={20} color='' className='text-dark' />,
    link: "/products/flash-accounts/"
  }

]
export const aboutList = [
  {
    title: "Why XIRCLS?",
    desc: "Democratizing Martech for Sustainable Growth.",
    logo: <VscTarget size={25} color='' className='text-dark' />,
    link: "/about-us/why-XIRCLS"
  },
  {
    title: "Why Collaborative Marketing?",
    desc: "Because Life is Collaboration, Not Competition.",
    logo: <PiCodeBlockLight size={23} color='' className='text-dark' />,
    link: "/about-us/why-collaborative-marketing/"

  },
  {
    title: "Vision & Mission",
    desc: "To Empower Businesses, Globally",
    logo: <TiFlashOutline size={23} color='' className='text-dark' />,
    link: "/about-us/vision-&-mission-statement/"

  }

]

const Navbar = ({ position }) => {


  useEffect(() => {
    window.addEventListener('scroll', () => {
      const Yscroll = window.scrollY
      const first_navbar = document.getElementById("first_navbar")
      if (first_navbar) {
        if (Yscroll > 50) {
          first_navbar.style.boxShadow = " 0 0px 8px rgba(0,0,0,0.16)"
        } else {
          first_navbar.style.boxShadow = " none"

        }
      }
    })
  }, [])


  const width = window.innerWidth
  const [toggleMenu, setToggleMenu] = useState(true)
  const positionCal = () => {
    if (width > 1000) {
      return position
    }
    if (width < 1000) {
      return 'notFixed'
    }
  }
  const isFixed = positionCal()
  // console.log(isFixed)

  const [ShowProducts, setShowProducts] = useState(false)
  const [ShowCompany, setShowCompany] = useState(false)

  function mouseEnter(name) {
    if (width > 1000) {
      if (name === "products") {
        setShowProducts(true)
      }
      if (name === "company") {
        setShowCompany(true)
      }
    }
  }

  function mouseLeave(name) {
    if (width > 1000) {
      if (name === "products") {
        setShowProducts(false)
      }
      if (name === "company") {
        setShowCompany(false)
      }
    }
  }
  function mouseClick(name) {
    if (name === "products") {
      setShowProducts(!ShowProducts)
      setShowCompany(false)

    }
    if (name === "company") {
      setShowCompany(!ShowCompany)
      setShowProducts(false)

    }
  }

  return (
    <div className={`Container-subNav border-bottom py-1 py-md-0 bg-white  position-${isFixed === "notFixed" ? "relative" : "fixed"}  `} id="first_navbar" style={{ zIndex: "999", marginTop: '-5px', paddingBottom: "11px" }}>
      <div className=' justify-content-center bg-white m-0 p-0'>
        <nav className={`homeNav  `}>
          <Link to="/">
            <img src={logo} alt="logo" className='mx-2 nav_logo_img' />
          </Link>

          <div    className={`toggleMenu py-2 ${toggleMenu ? "toggleMenuUp" : "toggleMenuDown"}`} >
            <ul className=' list-unstyled d-inline-flex gap-5 pt-1'>

              <li className='productLi ItemsList' onClick={() => mouseClick("products")} onMouseEnter={() => mouseEnter("products")} onMouseLeave={() => mouseLeave("products")}>
                <h4 className='fs-4 text-dark'  >Products <IoIosArrowDown className={ShowProducts ? "rotate-180" : ""} /></h4>
                <div className={`subMenu ${ShowProducts ? "productSubMenuDown" : "productSubMenuUp"} p-1 border border-1 rounded-3 px-md-3`}>
                  {/* <div className={`subMenu ItemsList-cont  p-1 border border-1 rounded-3 px-md-3`}> */}
                  <ul className=' list-unstyled '>
                    {
                      productList.map((ele, index) => (
                        <li key={index}  className='mt-1 hoverItems' style={{ padding: "5px 5px" }} onClick={() => setToggleMenu(true)}>
                          <Link to={ele.link}>
                            <div className=' d-flex flex-md-row flex-column align-items-center gap-2' style={{ marginBottom: "12px" }}>
                              {/* <img src={ele.img} alt="XIRCLSLogo" width={50} /> */}
                              <div className='nav-list-logo d-flex align-items-center justify-content-center  rounded-circle' style={{ minWidth: "50px", minHeight: "50px", background: "#F0F0F0" }}>
                                {/* <BsCodeSquare size={25} color='' className='text-dark'/> */}
                                {ele.logo}
                              </div>
                              <div className='d-flex flex-column justify-content-center w-100 '>
                                <h4 className='text-capitalize text-black fw-bolder' >{ele.title}</h4>
                                <p className='m-0 text-dark fw-bold fs-6 ' style={{ marginBottom: "5px", marginTop: "5px" }}>For {ele.desc}</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </li>
              <Link to='/partners' className='fs-4 text-dark text-center' onClick={() => setToggleMenu(true)}> <li ><p>Partners</p></li></Link>
              {/* <Link to='/developers' className='fs-4 text-dark text-center'> <li ><p>Developers</p></li></Link> */}
              <Link to='/blog' className='fs-4 text-dark text-center' onClick={() => setToggleMenu(true)}> <li ><p>Blog</p></li></Link>

              <li className='aboutLi ItemsList' onClick={() => mouseClick("company")} onMouseEnter={() => mouseEnter("company")} onMouseLeave={() => mouseLeave("company")}>
                <p className='text-dark fs-4'>Company <IoIosArrowDown className={ShowCompany ? "rotate-180" : ""} /></p>
                <div className={`subMenu  ${ShowCompany ? "aboutSubMenuDown" : "aboutSubMenuUp"} p-1 border border-1 rounded-3 px-md-3`}>
                  <ul className=' list-unstyled'>
                    {
                      aboutList.map((ele, index) => (
                        <li key={index} className='mt-1 hoverItems' style={{ padding: "5px 5px" }} onClick={() => setToggleMenu(true)}>
                          <Link to={ele.link}>
                            <div className=' d-flex flex-md-row flex-column align-items-center gap-2' style={{ marginBottom: "5px" }}>
                              <div className='nav-list-logo d-flex align-items-center justify-content-center  rounded-circle' style={{ minWidth: "50px", minHeight: "50px", background: "#F0F0F0" }}>
                                {ele.logo}
                              </div>
                              <div className='d-flex flex-column justify-content-center w-100 '>
                                <h4 className='text-capitalize text-black fw-bolder' >{ele.title}</h4>
                                <p className='m-0 text-dark fw-bold fs-6 ' style={{ marginBottom: "5px", marginTop: "5px" }}> {ele.desc}</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </li>

            </ul>
            <div className='navBtn gap-1'>
              <Link onClick={() => setToggleMenu(true)} to='/merchant/signup' className=' btn  btn-lg main-btn-blue-gra  fs-3 fw-lig'>Signup for Free</Link>

              <Link onClick={() => setToggleMenu(true)} to='/merchant/login' className=' btn btn-lg main-btn-dark fs-3 fw-lig' >Login</Link>
            </div>
          </div>
          <div className='menuBtn' onClick={() => { setToggleMenu(!toggleMenu); setShowProducts(false); setShowCompany(false) }}>
            <AiOutlineMenu size={25} />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar