import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, Text, ImageBackground, ToastAndroid, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useDispatch, useSelector } from "react-redux";
import PlaceCard from "../../components/Card";
import Header from "../../components/Header";
import { allPlaces } from "../../redux/appRedux";
import { styles } from "./styles";

export default Home = (props) => {

  const places = useSelector((state) => state.placesReducer.places)
  const [refreshing, setRefreshing] = useState(false)
  const dispatcher = useDispatch()

  // console.log(places)

  useEffect(()=>{
    dispatcher(allPlaces())
  }, [dispatcher])

  const onRefresh = useCallback( async () => {
    setRefreshing(true);
    await dispatcher(allPlaces())
    setRefreshing(false)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <Header props={props} />
        <ScrollView 
          style={styles.scroll_view}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={()=>onRefresh()}
            />
          }
        >
        {places.map((place, index)=>(
                <PlaceCard key={index} place={place} props={props} />
            ))}
        </ScrollView>
     </SafeAreaView>
  );
};
