import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const alreadyExistsTask = tasks.map(task => ({ ...task }))
    const task = alreadyExistsTask.find(task => task.title === newTaskTitle);

    if (task) {
      Alert.alert('Erro ao adicionar tarefa ', 'Tarefa já existente!')
      return
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks([newTask, ...tasks])



  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundTask = updatedTasks.find(item => item.id === id)

    if (!foundTask) return

    foundTask.done = !foundTask.done
    setTasks(updatedTasks)

  }

  function handleRemoveTask(id: number) {
    Alert.alert('Confirmar exlusão', 'Deseja realmente excluir tarefa?', [
      {
        text: 'Sim',
        onPress: () => { setTasks(tasks.filter(task => task.id !== id)) }
      },
      {
        text: 'Não'
      }
    ])
      ;
  }

  function handleEditTask(id: number, title: string) {

    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(task => task.id === id)

    if (!foundTask) return;

    foundTask.title = title

    setTasks(updatedTasks)

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})