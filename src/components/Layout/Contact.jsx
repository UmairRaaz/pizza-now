import React from 'react'
import SectionHeaders from './SectionHeaders'

const Contact = () => {
  return (
    <section id='contact' className='text-center my-8 '>
        <SectionHeaders mainhead={"Contact Us"} subhead={"Don't Hesitate"} />
        <div className='mt-8'>
        <a className='text-4xl underline text-gray-400' href="">+999 999 999</a>
        </div>
        
        
    </section>
  )
}

export default Contact