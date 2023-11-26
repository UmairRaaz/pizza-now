import React from 'react'
import SectionHeaders from './SectionHeaders'

const AboutSection = () => {
  return (
    <section id="about" className="text-center my-16 px-4 md:px-0">
        <SectionHeaders mainhead={"Our Story"} subhead={"About Us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p >🍕 Serving Happiness, One Slice at a Time!</p>
          <p >Welcome to Pizza Now, where passion meets delivery excellence. At Pizza Now, we're not just about delivering pizzas; we are on a mission to bring joy to your doorstep through mouthwatering, freshly baked pizzas.</p>
        </div>
      </section>
  )
}

export default AboutSection