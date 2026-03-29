import React from 'react'
import leafLeft from '/images/hero-left-leaf.png'
import leafRight from '/images/hero-right-leaf.png'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

const Hero = () => {
  useGSAP(() => {
    const heroSplit = new SplitText('.title', {
      type: 'chars, words',
    })
    const paragraphSplit = new SplitText('.subtitle', {
      type: 'lines',
    })

    heroSplit.chars.forEach((char) => {
      char.classList.add('text-gradient')
    })

    gsap.from(heroSplit.chars, {
      y: 100,
      opacity: 0,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    })

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    })

    gsap.from('.hero-tag', {
      opacity: 0,
      y: 20,
      duration: 1.8,
      ease: 'expo.out',
      delay: 0.8,
    })

    gsap.from('.hero-link', {
      opacity: 0,
      y: 20,
      duration: 1.8,
      ease: 'expo.out',
      delay: 1.5,
    })

    const heroScroll = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
    heroScroll
    .to('.right-leaf', { y:300 }, 0)
    .to('.left-leaf', { y:-200 }, 0)
  }, [])

  return (
    <>
      <section id='hero' className='noisy'>
        <h1 className='title'>MOJITO</h1>
        <img src={leafLeft} alt="leaf-left" className='left-leaf' />
        <img src={leafRight} alt="leaf-right" className='right-leaf' />

        <div className='body'>
          <div className='content'>
            <div className="space-y-5 hidden md:block">
              <p className='hero-tag'>Cool. Crips. Classic.</p>
              <p className="subtitle">Sip the Spirit <br /> of Summer</p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails" className='hero-link block'>View cocktails</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero