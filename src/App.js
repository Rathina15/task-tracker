import { useState, useEffect } from 'react'
import Header from './component/Header'
import Tasks from './component/Tasks'
import AddTask from './component/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState
    (false)
  const [tasks, setTask] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }


  //Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTask([...tasks, newTask])
  }


  //Delete task
  const onDelete = (id) => {
    console.log('Delete')
    setTask(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTask(tasks.map((task) => task.id === id
      ? { ...task, reminder: !task.reminder } : task
    ))
  }


  return (
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask}
      />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={onDelete} onToggle={toggleReminder} />
      ) : ('No Tasks to Show'
      )}

    </div>
  );
}
export default App