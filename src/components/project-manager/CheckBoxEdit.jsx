import React from 'react'

const CheckBoxEdit = ({checkGenres, setCheckGenres}) => {
    

    const checkboxArray = ['production', 'commercial','motion','events']
    const handleIsChecked = (e) => {
        const {checked,value} = e.target
        if(checked){
          setCheckGenres([...checkGenres,value])
        }else{
          setCheckGenres(checkGenres.filter(item=>item!==value))
        }
      }


      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
  return (
    <div className='d-flex gap-4'>
        <span>Genres:</span>
        <div className='d-flex flex-row justify-content-between gap-3'>
            {
                checkboxArray.map((item, index) => (
                    <label key={index} htmlFor={item}>
                    <input type="checkbox" name={item} value={item} onChange={handleIsChecked} checked={checkGenres.includes(item)}/>
                    {capitalizeFirstLetter(item)}
                  </label>
                ))
            }

        </div>
          
          
        </div>
  )
}

export default CheckBoxEdit