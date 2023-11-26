import React from 'react'

const SectionHeaders = ({subhead, mainhead}) => {
  return (
    <div>
        <h3 className=" uppercase text-gray-600 font-semibold leading-4">
          {subhead}
        </h3>
        <h2 className="text-primary font-bol text-4xl italic">{mainhead}</h2>
    </div>
  )
}

export default SectionHeaders