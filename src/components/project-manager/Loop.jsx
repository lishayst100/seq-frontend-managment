import React from 'react'

const Loop = ({isLooping,setIsLooping}) => {
  return (
    <div className=" d-flex align-items-center gap-3 justify-content-center   ">
        <label className="label-title" htmlFor="loopCheckbox">
            Loop Video?
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="loopCheckbox"
            checked={isLooping}
            onChange={() => setIsLooping(!isLooping)}
          />
          
        </div>
  )
}

export default Loop