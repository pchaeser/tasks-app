import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import commonStyles from '../commonStyles'

export default function CreateTask({ onCancel, onSave, visible }) {
  const [descricao, setDescricao] = useState('')
  const [data, setData] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  function getDatePicker() {
    const DatePickerComponent = (
      <DatePicker
        mode={'date'}
        value={data}
        onChange={(_, date = new Date()) => {
          setShowDatePicker(false)
          setData(date)
        }}
      />
    )

    const dateString = moment(data).format('ddd, D [de] MMM [de] YYYY')

    if (Platform.OS === 'android') {
      return (
        <View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {showDatePicker && DatePickerComponent}
        </View>
      )
    }

    return DatePickerComponent
  }

  return (
    <Modal
      transparent
      animationType={'slide'}
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>
          Nova Tarefa
        </Text>
        <TextInput
          style={styles.input}
          placeholder={'Descreva a tarefa...'}
          onChangeText={text => setDescricao(text)}
          value={descricao}
        />
        {getDatePicker()}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onSave({ desc: descricao, estimatedAt: data })
              setDescricao('')
              setData(new Date())
            }}
          >
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  container: {
    backgroundColor: '#FFF'
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    margin: 15,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15
  }
})
