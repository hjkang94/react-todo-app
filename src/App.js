import React, { useCallback, useState } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';

const App = () => {
  console.log('App');

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodoData = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodoData]);
    setValue('');
  };

  const handleClick = useCallback(
    (id) => {
      const newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
    },
    [todoData],
  );

  const handleRemoveClick = () => {
    setTodoData([]);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h2>할 일 목록</h2>
          <button
            className="p-2 text-gray-400 border-2 border-gray-400 rounded hover:text-white hover:bg-gray-300"
            onClick={handleRemoveClick}
          >
            전체 삭제
          </button>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} handleClick={handleClick} />

        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;
