import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ProjectContext } from '../../context/ProjectContext';
import DeleteProjectBtn from '../project-manager/DeleteProjectBtn';
import EditBtn from '../project-manager/EditBtn';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../services/utils';

const ArrangeItemsComponent = () => {
    
   
    const [items, setItems] = useState([]);
    const nav = useNavigate()
    const getProjects = () => {
      fetch(`${BASE_URL}/api/projects/getProjects`)
      .then(res => res.json())
      .then(result => setItems(result))
      .catch(e => console.log(e))
  }

    useEffect(()=>{
      
    getProjects()
    },[])

    

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    // Update the order property based on the new arrangement
    updatedItems.forEach((item, index) => {
      item.linkId = index;
    });

    setItems(updatedItems);
  };

  const saveOrder = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/arrange/updateOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arrangedData: items,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Good job!",
          text: 'Projects Arranged Successfully',
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
      <div className=' '>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="arrangeItems">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className=' d-flex flex-column gap-3'>
                {items.sort((a,b)=> a.linkId - b.linkId).map((item, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='border d-flex gap-2 p-3 justify-content-lg-between align-items-center justify-content-center flex-column flex-md-row'
                      >
                          
                    <div className=' d-flex gap-2'>
                    <img className='rounded' src={item.frontImage} alt="" width={90} height={90} onClick={()=>{nav(`project/${item._id}`)}}/>
                   <span style={{fontWeight: 600}}>{item.title}</span>
                    </div>
                    
                   <div className='d-flex gap-3 align-items-center justify-self-end'>
                    <EditBtn id={item._id}/>
                    <DeleteProjectBtn id={item._id} getProjects={getProjects}/>
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
      <button onClick={saveOrder} className='btn btn-primary mt-3'>Save Order</button>
    </div>
  );
};

export default ArrangeItemsComponent;
