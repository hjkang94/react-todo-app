import React from 'react';

const ListItem = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot, handleClick }) => {
    console.log('ListItem');

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          completed = !completed;
        }
        return data;
      });

      setTodoData(newTodoData);
    };
    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
      >
        <div className="items-center">
          <input type="checkbox" defaultChecked={false} onChange={() => handleCompleteChange(id)} />
          <span className={completed ? 'line-through' : undefined}>{title}</span>
        </div>
        <div className="items-center">
          <button onClick={() => handleClick(id)}>x</button>
        </div>
      </div>
    );
  },
);

export default ListItem;
