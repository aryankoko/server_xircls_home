import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function SubNavbar({ navTitle }) {

  const [showMenu, setshowMenu] = useState(false)

  const LinksFun = () => {
    let AllLinks = []
    switch (navTitle) {
      case 'superleadz':
        AllLinks = [{ title: 'Overview', link: '/products/superleadz/lead-generation-nurturing-and-conversion' }, { title: 'Features', link: '/products/superleadz/lead-generation-nurturing-and-conversion/features' }, { title: 'Pricing', link: '/products/superleadz/lead-generation-nurturing-and-conversion/pricing' }, { title: 'FAQ', link: '/products/superleadz/lead-generation-nurturing-and-conversion/faqs' }]
        break
      case 'partners':
        AllLinks = [{ title: 'Overview', link: '/partners' }, { title: 'FAQ', link: '/partners/faqs' }]
        break
      case 'flash-accounts':
        AllLinks = [{ title: 'Overview', link: '/products/flash-accounts/' },  { title: 'Features', link: '/products/superleadz/lead-generation-nurturing-and-conversion/features' }, {title:'Pricing', link:'/products/flash-accounts/pricing'}, { title: 'FAQ', link: '/products/flash-accounts/faq'}]
        break
      default:
        AllLinks = [{ title: 'Overview', link: '/' }]

    }
    return AllLinks
  }
  const Links = LinksFun()
  const width = window.innerWidth
  useEffect(() => {
    if (width < 500) {
      const second_navbar = document.getElementById("second_navbar")
      second_navbar.style.top = "80px"
    }
    window.addEventListener('scroll', () => {
      const Yscroll = window.scrollY
      const second_navbar = document.getElementById("second_navbar")
      if (!second_navbar) {
        return null
      }
      if (Yscroll > 90) {
        second_navbar.style.top = "0px"
        // second_navbar.style.boxShadow = " 0 2px 8px rgba(0,0,0,0.16)"
      } else {
        // second_navbar.style.top = "87px"
        second_navbar.style.top = ` ${87 - Yscroll}px`
        // second_navbar.style.boxShadow = " none"
      }
    })

  }, [])

  return (
    <div className='Container-subNav bg-white border-bottom  second_navbar  p-0' id="second_navbar" style={{ position: 'fixed', top: '87px' }}>
      <div className=' justify-content-center bg-white m-0 p-0 px-2'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light   m-0 bg-white   "  >
          <div className="container-fluid m-0  p-0 " >
            <Link to={Links[0].link} className="navbar-brand  text-black text-capitalize " onClick={() => window.scroll(0, 0)}>{navTitle}</Link>
            <h3 className="navbar-toggler " onClick={() => setshowMenu(!showMenu)} style={{ border: 'none' }}>
              <span className="fs-4">{!showMenu ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
            </h3>
            <div className={`collapse navbar-collapse  ${showMenu ? 'show' : ''} `} id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-1 fs-5 px-2">
                {
                  Links.map((menu, index) => (
                    <li className="nav-item " key={index}>
                      <Link to={menu.link} className="nav-link text-dark" aria-current="page" >{menu.title}</Link>
                    </li>
                  ))
                }


              </ul>

            </div>
          </div>
        </nav>
      </div>
    </div>

  )
}
