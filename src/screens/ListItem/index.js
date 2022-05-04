import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import { Image } from "react-native-elements";
// import { getPokemon, IMG_URL } from "../../api";
import { styles } from "./styles";
import { delPlace, placeById, changeFlagCreateOrEdit } from "../../redux/appRedux";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../components/Button";
import Header from "../../components/Header";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default ListItem = (props) => {

  const id = props.route.params._id;
  const placeByAidi = useSelector(state=>state.placesReducer.place)
  const [place, setPlace] = useState({name: 'name'});
  const [img, setImg] = useState('https://www.xtrafondos.com/descargar.php?id=5846&resolucion=2560x1440')
  
  const dispatcher = useDispatch()


  console.log(id)
  // console.log(name)

  useEffect(()=>{
    dispatcher(placeById(id))
},[])

useEffect(()=>{
  if(placeByAidi.name !== undefined){
    setPlace(placeByAidi)
    setImg(placeByAidi.imgUrl[0])
    console.log(place)
  }
},[placeByAidi])

const handleDeleteButton = () => {
  dispatcher(delPlace(place._id))
}

const handleEditButton = async () => {
  await dispatcher(changeFlagCreateOrEdit(1)); 
  props.navigation.navigate("Form")
}

const linkToMap = () => {
  console.log(place?.location[0].latitude);
  // let lat = latitude;
  // let lng = longitude;
  const scheme = Platform.select({
    ios: "maps:0,0?q=",
    android: "geo:0,0?q="
  });
  const latLng = `${place?.location[0].latitude},${place?.location[0].longitude}`;
  const label = place?.name ///pasar algun string;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });
  Linking.openURL(url);
};

  return (
    <SafeAreaView style={styles.container}>
      <Header leftIcon='arrow-back'  title='Detalle' leftAction={()=>props.navigation.goBack()} props={props} />
      <View style={styles.content}>
        {/* <Header /> */}
        <ScrollView contentContainerStyle={{ flex: 1, width }}>
          <Text style={styles.title} >{place?.name}</Text>
          
          <View style={styles.container__image}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: img }}
            />
          </View>
          {/* Informacion */}

          <View style={styles.container__information}>
            <View style={styles.information}>
                <View style={styles.text__information__container} >
                  <Text style={styles.text__information} >{place?.description}</Text>
                </View>
            </View>
            <View style={{display:'flex', flexDirection: 'row-reverse', width: '100%', padding: '2%' }} >
              <CustomButton onPress={()=>handleDeleteButton()} title='Borrar' nameIcon="delete" color="red" />
              <CustomButton onPress={()=>handleEditButton()} title='Editar' nameIcon="edit" />
              <CustomButton onPress={()=>linkToMap()} title='Ir a maps' nameIcon="map" color='green' />
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
