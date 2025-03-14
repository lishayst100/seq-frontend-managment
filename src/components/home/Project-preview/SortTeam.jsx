import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../services/utils';
import DeleteBtn from '../../team/DeleteBtn'; 

const SortTeam = () => {
    
   
    const [team, setTeam] = useState([])
    
    const nav = useNavigate()
    const getTeam = () => {
      fetch(`${BASE_URL}/api/team`)
      .then(res => res.json())
      .then(result => setTeam(result))
      .catch(e => console.log(e))
  }

    useEffect(()=>{
        getTeam()
    },[])

    

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(team);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    // Update the order property based on the new arrangement
    updatedItems.forEach((item, index) => {
      item.linkId = index;
    });

    setTeam(updatedItems);
  };

  const saveOrder = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/arrange/updateOrderTeam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arrangedData: team,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Good job!",
          text: 'Team Arranged Successfully',
          icon: "success",
        });
      } else {
        console.error('Error saving order:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className='container'>
      <button onClick={saveOrder} className='btn btn-success my-3 gap-2 '>Save Order</button>
      <div className=' '>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="arrangeItems">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className=' d-flex flex-column gap-3'>
                {team.sort((a,b)=> a.linkId - b.linkId).map((item, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='border d-flex gap-2 p-3 justify-content-lg-between align-items-center justify-content-center flex-column flex-md-row'
                      >
                          
                    <div className=' d-flex gap-2'>
                    <span>{index + 1}.</span>
                    <img className='rounded' src={item.img} alt="" width={90} height={90} onClick={()=>{nav(`/edit-team/${item._id}`)}}/>
                   <span style={{fontWeight: 600}}>{item.name}</span>
                   <span style={{fontWeight: 600}}>{item.title}</span>
                    </div>
                    
                   <div className='d-flex gap-3 align-items-center justify-self-end'>
                    
                   <button className='btn btn-success' onClick={()=>{nav(`/edit-team/${item._id}`)}}>Edit Team Member</button>
                    <DeleteBtn id={item._id} setTeam={setTeam} />
                   </div>
                   
                </div>
                      
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      
    </div>
  );
};

export default SortTeam;
