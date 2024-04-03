import React from 'react'

const FrontImage = ({frontImage}) => {
  return (
    <div>
          <h3>Front Image</h3>
          <img src={frontImage} alt="..." style={{maxWidth: 400 ,height: 300}} />
        </div>
  )
}

export default FrontImage