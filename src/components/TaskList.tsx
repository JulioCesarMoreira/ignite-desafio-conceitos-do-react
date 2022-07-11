import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<(Task | undefined)[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);


  function createNewRandomId() {

    const newId = Math.floor(Math.random() * 100);
    const findTask = tasks.find((task) => {
      return task?.id == newId;
    })

    if (findTask != undefined) {
      createNewRandomId()
    }
    else {
      return newId
    }

  }

  function handleCreateNewTask() {
    const newId = createNewRandomId();

    const newTask = {
      id: newId,
      isComplete: false,
      title: newTaskTitle,
    } as Task;

    var dinamicTaskList = tasks;

    if (newTask.title != '') {
      dinamicTaskList.push(newTask);

      setTasks(dinamicTaskList);

      setNewTaskTitle('');
    }

    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id?: number) {

    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let editTaskCompletion = tasks;
    if (id)
      editTaskCompletion.forEach(task => {
        if (task?.id === id) {
          task.isComplete ? task.isComplete = false : task.isComplete = true
        }
      })

    setTasks(editTaskCompletion);
    if (newTaskTitle === '') {
      setNewTaskTitle(' ');
    } else {
      setNewTaskTitle('');
    }
  }

  function handleRemoveTask(id?: number) {
    // Remova uma task da listagem pelo ID
    if (id)
      setTasks(tasks.map((task) => {
        if (task?.id != id) {
          return task
        }
      }))
  }


  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.length > 0
            ? tasks.map((task) => {
              if (task?.id != undefined)
                return (
                  <li key={task?.id}>
                    <div className={task?.isComplete ? 'completed' : ''} data-testid="task" >
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          readOnly
                          checked={task?.isComplete}
                          onClick={() => handleToggleTaskCompletion(task?.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <p>{task?.title}</p>
                    </div>

                    <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task?.id)}>
                      <FiTrash size={16} />
                    </button>
                  </li>)
            })
            : null
          }

        </ul>
      </main>
    </section>
  )
}