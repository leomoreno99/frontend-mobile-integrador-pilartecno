import React from 'react'
const { Button, Icon } = require("react-native-elements");

export const CustomButton = ({title='title', nameIcon='home', color='#398290', onPress}) => {
  return (
    <Button
          onPress={()=> onPress()}
          buttonStyle={{borderColor: color, marginLeft: 8 }}
          titleStyle={{color: color}}
          icon={
            <Icon
              name={nameIcon}
              size={15}
              color={color}
            />
          }
          type='outline'
          title={title}
    />
  )
}
