import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Tasks({
  desc,
  estimatedAt,
  doneAt,
  toggleTask,
  id,
  onDelete
}) {
  const doneOrNotStyle = doneAt != null
    ? { textDecorationLine: 'line-through' }
    : {}

  function getFormattedDate() {
    return moment(doneAt ? doneAt : estimatedAt)
      .locale('pt-br')
      .format('ddd, D [de] MMMM')
  }

  function getCheckView() {
    return doneAt !== null
      ? (
        <View style={styles.done}>
          <Icon name={'check'} size={15} color={'#FFF'} />
        </View>
      )
      : <View style={styles.pending} />
  }

  function getRightContent() {
    return (
      <TouchableOpacity style={styles.right} onPress={handleDeleteTask}>
        <Icon name={'trash'} size={30} color={'#fff'} />
      </TouchableOpacity>
    )
  }

  function getLeftContent() {
    return (
      <View style={styles.left}>
        <Icon
          name={'trash'}
          size={20}
          color={'#fff'}
          style={styles.removeIcon}
        />
        <Text style={styles.removeText}>Excluir</Text>
      </View>
    )
  }

  function handleDeleteTask() {
    onDelete(id)
  }

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={handleDeleteTask}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => toggleTask(id)}>
          <View style={styles.checkContainer}>
            {getCheckView(doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{desc}</Text>
          <Text style={styles.date}>{getFormattedDate()}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555'
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center'
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20
  },
  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center'
  },
  removeIcon: {
    marginLeft: 10
  },
  removeText: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    margin: 10
  }
})
