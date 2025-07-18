import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'

const Loading = ({size="large",color=theme.Colors.primary}) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={size} color={color}/>
      <Text>Loading</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})