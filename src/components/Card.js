import React from "react";
import { ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeDeleteNotification, changeFlagCreateOrEdit, delPlace, placeById } from "../redux/appRedux";
import { CustomButton } from "./Button";
const { Card, Text } = require("react-native-elements");

export default PlaceCard = ({place, props}) => {
  
  const flagDeleteNotification = useSelector(state => state.notificationsReducer.flagDeleteNotification)
  const {name, description, imgUrl, _id} = place

  const dispatcher = useDispatch()

  if(flagDeleteNotification === 1){
    ToastAndroid.show('Lugar borrado exitosamente', ToastAndroid.SHORT)
    dispatcher(changeDeleteNotification(0))
  } else if (flagDeleteNotification === 2){
    ToastAndroid.show('Error al intentar borrar lugar', ToastAndroid.SHORT)
      dispatcher(changeDeleteNotification(0))
  }
  
  const handleDeleteButton = () => {
    dispatcher(delPlace(_id))
  }

  const handleEditButton = async () => {
    await dispatcher(changeFlagCreateOrEdit(1)); 
    await dispatcher(placeById(_id))
    props.navigation.navigate("Form")
}

  return (
    <Card>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ListItem", id={_id})}
        >
          <Card.Title>{name}</Card.Title>
          <Card.Divider/>
          <Card.Image source={{uri: imgUrl[0]}}/>
          <Text style={{marginBottom: 10}}>
            {description}
          </Text>
        </TouchableOpacity>
        <View style={{display:'flex', flexDirection: 'row-reverse' }} >
          <CustomButton onPress={()=>handleDeleteButton()} title='Borrar' nameIcon="delete" color="red" />
          <CustomButton onPress={() => handleEditButton()} title='Editar' nameIcon="edit" />
        </View>
</Card>
  )
};
