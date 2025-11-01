import React from 'react'
import HeroSection from '../components/HeroSection'
import LatestProjects from './sections/LatestProjects'
import AmenitiesSection from './sections/AmenitiesSection'
import TestimonialsSection from './sections/TestimonialsSection'
import AboutSection from './sections/AboutSection'
// import StatsCounter from './sections/StatsCounter'
import WhatWeDo from './sections/WhatWeDo'
import CTABanner from './sections/CTABanner'
import { FloatingWhatsApp } from "react-floating-whatsapp";


export default function Home(){
  return (
    <>
      <HeroSection />
      <LatestProjects />
      <CTABanner/>
      <AboutSection/>
      {/* <StatsCounter/> */}
      <WhatWeDo/>
      <AmenitiesSection />
      {/* <CTABanner/> */}
      <TestimonialsSection />

      {/* WhatsApp Integration */}
      <FloatingWhatsApp
        phoneNumber="+917982481132 " // 👈 your WhatsApp number
        accountName="Genesisrealty"
        allowEsc
        allowClickAway
        notification
        notificationSound
        chatMessage="Hello 👋 How can we help you today?"
        avatar="/assets/logo.png" // optional, your logo or icon
      />

    </>
  )
}
