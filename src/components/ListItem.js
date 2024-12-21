import React, { useState } from 'react';

const ListItem = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot, handleClick }) => {
    console.log('ListItem');

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = (id) => {
      const newTodoData = todoData.map((data) => {
        if (data.id === id) {
          completed = !completed;
        }
        return data;
      });

      setTodoData(newTodoData);
    };

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });

      setTodoData(newTodoData);
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded">
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <input
                value={editedTitle}
                onChange={handleEditChange}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
              />
            </form>
          </div>
          <div className="items-center">
            <button className="px-2 py-2 float-right" onClick={() => setIsEditing(false)}>
              x
            </button>
            <button onClick={handleSubmit} className="px-2 py-2 float-right" type="submit">
              저장
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
        >
          <div className="items-center">
            <input
              className="mr-3"
              type="checkbox"
              defaultChecked={false}
              onChange={() => handleCompleteChange(id)}
            />
            <span className={completed ? 'line-through' : undefined}>{title}</span>
          </div>
          <div className="items-center">
            <button className="px-2 py-2 float-right" onClick={() => handleClick(id)}>
              x
            </button>
            <button className="px-2 py-2 float-right" onClick={() => setIsEditing(true)}>
              수정
            </button>
          </div>
        </div>
      );
    }
  },
);

export default ListItem;
