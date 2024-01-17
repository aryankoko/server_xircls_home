import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Autoplay } from 'swiper'

import img1 from "./img/1.png"
import img2 from "./img/2.png"
import img3 from "./img/3.png"
import img4 from "./img/4.png"
import img5 from "./img/5.png"
import img6 from "./img/6.png"
import img7 from "./img/7.png"
import img8 from "./img/8.png"
import img9 from "./img/9.png"
import img10 from "./img/10.png"

const LogoSlider = () => {
  const [numOfPages, setNumOfPages] = useState(6)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setNumOfPages(6)
      } else if (window.innerWidth <= 576) {
        setNumOfPages(2)
      } else if (window.innerWidth <= 768) {
        setNumOfPages(4)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const imageArray = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]

  return (
    <div className='mt170' style={{ background: '#e5e7eb' }}>
      <div className='d-flex justify-content-center align-items-center'>
        <Swiper
          spaceBetween={30}
          slidesPerView={numOfPages}
          navigation={false}
          pagination={{ clickable: false }}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
          className='px-3 py-2 d-flex justify-content-center align-items-center'
        >
          {imageArray.map((image, key) => (
            <SwiperSlide key={key} className='px-5'>
              <img className='px-2' src={image} width={180} alt={`slide-${key + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default LogoSlider
