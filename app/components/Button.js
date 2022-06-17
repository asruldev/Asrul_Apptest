import React from "react"
import { TouchableOpacity } from "react-native"

export const Button = ({
  style
}) => {
  return <TouchableOpacity style={styles.back} onPress={() => {
    dispatch(fetchContactDetail({}))
    navigation.goBack()
  }}>
    <Text style={styles.backText}>Back</Text>
  </TouchableOpacity>
}