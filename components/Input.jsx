import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyles && props.containerStyles]}>
      {
        props.Icon && props.Icon
      }
      <TextInput
        style={{flex:1}}
        placeholderTextColor={theme.Colors.textLight}
        ref={props.inputRef && props.inputRef}
        {...props}
        />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:hp(7.2),
        alignItems:'çenter',
        justifyContent:'center',
        borderWidth:0.4,
        borderColor:theme.Colors.text,
        borderRadius:theme.radius.xxl,
        borderCurve:'continuous',
        paddingHorizontal:18,
        gap:12,
    }
})