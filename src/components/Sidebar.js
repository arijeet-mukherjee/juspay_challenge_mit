import React from "react";
import { Draggable, Droppable} from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import {
  motionComponents,
  looksComponents,
  controlComponents,
  eventsComponents,
} from "./SidebarConstants";

export default function Sidebar({placeholderProps,id}) {

  const reorderElementAtIndex = (index) => {
    let parentNode = document.getElementById('ul-motion');
    if(!parentNode || !index){
      return;
    }
    let liToSwap = document.getElementById('li-motion');
    //liToSwap.style.display = 'block'
    let temp = parentNode.children[index+1];
    parentNode.insertBefore(liToSwap, temp);
  }

  const reorderLookElementAtIndex = (index) => {
    let parentNode = document.getElementById('ul-looks');
    if (!parentNode || !index) {
      return;
    }
    let liToSwap = document.getElementById('li-looks');
    //liToSwap.style.display = 'block'
    let temp = parentNode.children[index + 1];
    parentNode.insertBefore(liToSwap, temp);
  }

  const reorderControlElementAtIndex = (index) => {
    let parentNode = document.getElementById('ul-control');
    if (!parentNode || !index) {
      return;
    }
    let liToSwap = document.getElementById('li-control');
    //liToSwap.style.display = 'block'
    let temp = parentNode.children[index + 1];
    parentNode.insertBefore(liToSwap, temp);
  }

  const reorderEventElementAtIndex = (index) => {
    let parentNode = document.getElementById('ul-event');
    if (!parentNode || !index) {
      return;
    }
    let liToSwap = document.getElementById('li-event');
    //liToSwap.style.display = 'block'
    let temp = parentNode.children[index + 1];
    parentNode.insertBefore(liToSwap, temp);
  }

  return (
    < div className = "w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200 bg-gray-200" >
      <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-black p-2 w-auto">
        Side Bar
      </div>
      {/* Motion */}
      <div className="font-bold"> {"Motion"} </div>
      <Droppable droppableId="sideArea-motion" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-motion my-3"
            id = "ul-motion"
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
            {motionComponents.map((x, i) => {
              return (
                <Draggable
                  className = "bg-gray-300"
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                  onDragStart={(e)=>{console.log("dropped")}}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className = "bg-gray-300 my-2 dnd-copy"
                    >
                      {getComponent(x)}
                    </li>
                    
                    
                  )}
                </Draggable>
              );
            })}
            
            <li style={{
              top: placeholderProps.clientY,
              left: placeholderProps.clientX,
              height: placeholderProps.clientHeight,
              background: "#e53935",
              width: placeholderProps.clientWidth,
              'borderRadius' : '5px',
              margin :'0 0 26px 0'
            }}
            className = "bg-gray-300 my-2 dnd-copy"
            id="li-motion"
            order = {placeholderProps.initialIndex}
            />
            {
              console.log(placeholderProps.initialIndex)
            }
            {
              reorderElementAtIndex(placeholderProps.initialIndex)
            }
            {
              provided.placeholder
            }
          </ul>
        )}
      </Droppable>

      {/* Looks */}
      <div className="font-bold"> {"Looks"} </div>
      <Droppable droppableId="sideArea-looks" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-looks my-3"
            id = "ul-looks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {looksComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
            <li style={{
              top: placeholderProps.clientY,
              left: placeholderProps.clientX,
              height: placeholderProps.clientHeight,
              background: "#e53935",
              width: placeholderProps.clientWidth,
              'borderRadius' : '5px',
              margin :'0 0 26px 0'
            }}
            className = "bg-gray-300 my-2 dnd-copy"
            id="li-looks"
            order = {placeholderProps.initialIndex}
            />
            {
              console.log(placeholderProps.initialIndex)
            }
            {
              reorderLookElementAtIndex(placeholderProps.initialIndex)
            }
          </ul>
        )}
      </Droppable>

      {/* Control */}
      <div className="font-bold"> {"Control"} </div>
      <Droppable droppableId="sideArea-control" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-control my-3"
            id = "ul-control"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {controlComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
            <li style = {
              {
                top: placeholderProps.clientY,
                left: placeholderProps.clientX,
                height: placeholderProps.clientHeight,
                background: "#e53935",
                width: placeholderProps.clientWidth,
                'borderRadius': '5px',
                margin: '0 0 26px 0'
              }
            }
            className = "bg-gray-300 my-2 dnd-copy"
            id = "li-control"
            order = {
              placeholderProps.initialIndex
            }
            /> {
              console.log(placeholderProps.initialIndex)
            } {
              reorderControlElementAtIndex(placeholderProps.initialIndex)
            }
          </ul>
        )}
      </Droppable>

      {/* Events */}
      <div className="font-bold"> {"Events"} </div>
      <Droppable droppableId="sideArea-motion" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-motion my-3"
            id = "ul-event"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {eventsComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
            <li style = {
              {
                top: placeholderProps.clientY,
                left: placeholderProps.clientX,
                height: placeholderProps.clientHeight,
                background: "#e53935",
                width: placeholderProps.clientWidth,
                'borderRadius': '5px',
                margin: '0 0 26px 0'
              }
            }
            className = "bg-gray-300 my-2 dnd-copy"
            id = "li-event"
            order = {
              placeholderProps.initialIndex
            }
            /> {
              console.log(placeholderProps.initialIndex)
            } {
              reorderEventElementAtIndex(placeholderProps.initialIndex)
            }
          </ul>
        )}
      </Droppable>
    </div>
  );
}
