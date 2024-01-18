import React from 'react'

const CheckBox = ({checkGenres, setCheckGenres}) => {


    const handleIsChecked = (e) => {
        const {checked,value} = e.target
        if(checked){
          setCheckGenres([...checkGenres,value])
        }else{
          setCheckGenres(checkGenres.filter(item=>item!==value))
        }
      }
  return (
    <div className='d-flex gap-4'>
        <span>Genres:</span>
        <div className='d-flex flex-row justify-content-between gap-3'>
            <label htmlFor="commercial">
            <input type="checkbox" name="commercial" value={'commercial'} onChange={handleIsChecked}/>
            Commercial
          </label>

          <label htmlFor="production">
            <input type="checkbox" name="production" value={'production'} onChange={handleIsChecked}/>
             Production
          </label>

          <label htmlFor="motion">
            <input type="checkbox" name="motion" value={'motion'} onChange={handleIsChecked}/>
            Motion
          </label>
        </div>
          
          
        </div>
  )
}

export default CheckBox