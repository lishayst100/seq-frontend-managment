import React, { useEffect, useState } from 'react'
import { BASE_URL_TEAM } from '../../services/utils'
import { useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'

const GetTeam = () => {
    const [team, setTeam] = useState([])
    const nav = useNavigate()

    useEffect(()=>{
        fetch(`${BASE_URL_TEAM}`)
        .then(res=> res.json())
        .then(result => setTeam(result))
    },[])

    

  return (
    <div >

        <button onClick={()=>{nav('/add-team')}} className='btn btn-primary my-5'>Add New Team Member</button>

        <div className='container mx-auto d-flex gap-3 justify-content-center align-items-center flex-wrap '>

        

        {
            team.map( t => (
                <div key={t._id} className='shadow-lg p-4 d-flex flex-column justify-content-center align-items-center gap-3'>
                    <p>{t.name}</p>
                    <p>{t.title}</p>
                    <p>{t.desc}</p>
                    <img src={t.img[0]} width={300} height={300} alt="..." className='img-fluid' />
                    
                    <div className='d-flex gap-3 justify-content-center align-items-center'>
                    <DeleteBtn id={t._id} setTeam={setTeam}/>
                    <button className='btn btn-success' onClick={()=>{nav(`/edit-team/${t._id}`)}}>Edit Team Member</button>
                    </div>
                    

                </div>
            ))
        }
        </div>
    </div>
  )
}

export default GetTeam