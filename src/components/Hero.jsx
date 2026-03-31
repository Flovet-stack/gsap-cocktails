import React, { useRef } from 'react'
import leafLeft from '/images/hero-left-leaf.png'
import leafRight from '/images/hero-right-leaf.png'
import bgVideo from '/videos/input.mp4'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({maxWidth: 767});

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
    .to('.left-leaf', { y:-200 }, 0);

    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    // Scroll-driven video scrubbing (drive `currentTime` only).
    const videoEl = videoRef.current;
    let videoScrollTl;
    let onLoadedMetadata;

    if (videoEl) {
      videoEl.pause();
      videoEl.currentTime = 0;

      const setupVideoScrollTl = () => {
        // Guard: ensure metadata is ready so `duration` is valid.
        const duration = videoEl.duration;
        if (!duration || Number.isNaN(duration)) return;

        videoScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: startValue,
            end: endValue,
            scrub: true,
          },
        });

        // Map scroll progress to the full video duration.
        videoScrollTl.to(videoEl, { currentTime: duration, ease: 'none', duration: 1 }, 0);
      };

      onLoadedMetadata = () => {
        setupVideoScrollTl();
        videoEl.removeEventListener('loadedmetadata', onLoadedMetadata);
      };

      // If metadata already exists, set up immediately.
      if (videoEl.readyState >= 1) {
        setupVideoScrollTl();
      } else {
        videoEl.addEventListener('loadedmetadata', onLoadedMetadata);
      }
    }

    return () => {
      // Cleanup for the scroll-triggered video timeline & listener.
      if (videoEl && onLoadedMetadata) {
        videoEl.removeEventListener('loadedmetadata', onLoadedMetadata);
      }
      if (videoScrollTl?.scrollTrigger) videoScrollTl.scrollTrigger.kill();
      if (videoScrollTl) videoScrollTl.kill();

      // Pause so the video doesn't keep playing if the browser decides to buffer/play.
      videoEl?.pause?.();
    };
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
      <div className="video absolute inset-0">
        <video ref={videoRef} src={bgVideo} muted playsInline preload='auto' />
      </div>
    </>
  )
}

export default Hero