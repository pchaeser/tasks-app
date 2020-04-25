import React, { useEffect, useState } from 'react'
import {
  Alert,
  TouchableOpacity,
  Platform,
  FlatList,
  View,
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-community/async-storage'

import Task from '../components/Task'
import CreateTask from './CreateTask'

import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'

export default function TaskList() {
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [showDoneTasks, setShowDoneTasks] = useState(true)
  const [tasks, setTasks] = useState([])
  const [visibleTasks, setVisibleTasks] = useState(tasks)

  useEffect(() => {
    loadStoredTasks()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [tasks, showDoneTasks])

  async function loadStoredTasks() {
    const appState = await AsyncStorage.getItem('state')

    if (appState) {
      const tasksState = JSON.parse(appState)

      setShowCreateTask(tasksState.showCreateTask !== undefined
        ? tasksState.showCreateTask
        : false
      )
      setShowDoneTasks(tasksState.showDoneTasks !== undefined
        ? tasksState.showDoneTasks
        : true
      )
      setTasks(tasksState.tasks || [])
      setVisibleTasks(tasksState.visibleTasks || [])
    }
  }

  function handleCreateTask({ desc, estimatedAt }) {
    if (!String(desc) || !String(desc).trim()) {
      return Alert.alert('Informe uma descrição para a tarefa!')
    }

    setTasks(stateTasks => [
      ...stateTasks, {
        id: Math.random(),
        doneAt: null,
        desc,
        estimatedAt
      }])
    setShowCreateTask(false)
  }

  function handleDeleteTask(taskId) {
    setTasks(stateTasks => stateTasks.filter(({ id }) => id !== taskId))
  }

  function filterTasks() {
    const newVisibleTasks = showDoneTasks
      ? [...tasks]
      : tasks.filter(({ doneAt }) => doneAt === null)

    setVisibleTasks(newVisibleTasks)

    AsyncStorage.setItem('state', JSON.stringify({
      showCreateTask,
      showDoneTasks,
      tasks,
      visibleTasks: newVisibleTasks
    }))
  }

  function toggleFilter() {
    setShowDoneTasks(showing => !showing)
  }

  function toggleTask(taskId) {
    setTasks(tasks.map(task => {
      return taskId === task.id
        ? { ...task, doneAt: task.doneAt ? null : new Date() }
        : task
    }))
  }

  return (
    <View style={styles.container}>
      <CreateTask
        visible={showCreateTask}
        onCancel={() => setShowCreateTask(false)}
        onSave={handleCreateTask}
        onDelete={handleDeleteTask}
      />
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon
              name={showDoneTasks ? 'eye' : 'eye-slash'}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>
            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }) => (
            <Task
              {...item}
              toggleTask={toggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => setShowCreateTask(true)}
      >
        <Icon name={'plus'} size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 3
  },
  taskList: {
    flex: 7
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 10
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
