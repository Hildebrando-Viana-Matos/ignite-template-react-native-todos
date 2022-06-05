import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const findingTask = updatedTasks.find((task) => task.id === id);

    if (!findingTask) {
      return;
    }

    findingTask.done = !findingTask?.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {
            return;
          },
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldState) => oldState.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTask = tasks.map((task) => ({ ...task }));

    const findingTask = updatedTask.find((task) => task.id === taskId);

    if (!findingTask) {
      return;
    }

    findingTask.title = taskNewTitle;

    setTasks(updatedTask);
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
