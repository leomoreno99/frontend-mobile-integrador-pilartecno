import React, { useEffect, useState } from 'react';
 import { Button, Text, TextInput, ToastAndroid, View } from 'react-native';
 import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import Header from '../../components/Header';
import * as yup from 'yup';
import { changeCreateNotification, changeEditNotification, creatPlace, editPlace } from '../../redux/appRedux';

const validationSchema = yup.object({
  name: yup
    .string('Ingrese su nombre')
    .min(3, 'El nombre debe tener un minimo de 3 caracteres')
    .max(30, 'El nombre debe tener un maximo de 30 caracteres')
    .required('El nombre es requerido'),
  description: yup
    .string('Ingrese la descripción')
    .min(3, 'La descripción debe tener un minimo de 3 caracteres')
    .max(250, 'La descripción debe tener un maximo de 250 caracteres')
    .required('La descripción es requerida'),
  // imgUrl: yup
  //   .array().of( yup
  //     .string('Los campos del array deben ser string')
  //     .required('Es requerida al menos una URL')
  //     )
  //   .min(1, 'Es requerida al menos una URL')
  //   .required('Es requerida al menos una URL'),
  imgUrl: yup
      .string('La URL debe ser string')
      .min(3, 'La URL debe tener un minimo de 3 caracteres')
      .max(250, 'La URL debe tener un maximo de 250 caracteres')
      .required('La URL es requerida'),
  latitude: yup
    .string('asdasd')
    // .number('La latitud debe ser un numero')
    // .negative('asd')
    .min(2, 'La latitud es requerida')
    .required('La latitud es requerida'),
  longitude: yup
    .string('asdasd')
    // .number('La longitud debe ser un numero')
    .required('La longitud es requerida')
});

const createStructure = (values) => {
  const {name, description, imgUrl, latitude, longitude} = values
  const place = {
    name: name,
    description: description,
    imgUrl: [imgUrl],
    location:{
      latitude: Number(latitude),
      longitude: Number(longitude)
    }
  }
  console.log(place.location.longitude)
  console.log(typeof(place.location.longitude))
  return place
}
 
 export const Form = (props) => {

  const [buttonName, setButtonName] = useState('Crear')
  const [titleHeader, setTitleHeader] = useState('Crear lugar')
  const flagCreateNotification = useSelector(state => state.notificationsReducer.flagCreateNotification)
  const flagEditNotification = useSelector(state => state.notificationsReducer.flagEditNotification)
  const flagCreateOrEdit = useSelector(state => state.functionalitiesReducer.flagCreateOrEdit)
  const place = useSelector(state=>state.placesReducer.place)
  let initialValues = {}

  const dispatcher = useDispatch()

  const setValues = () => {
    if(flagCreateOrEdit === 1){
      initialValues = {
        name: `${place.name}`,
        description: `${place.description}`,
        imgUrl: `${place.imgUrl}`,
        latitude: `${place.location[0].latitude}`,
        longitude: `${place.location[0].longitude}`
      }
    } else if (flagCreateOrEdit === 0){
      initialValues = {
        name: '',
        description: '',
        imgUrl: '',
        latitude: '',
        longitude: ''
      }
    }
  }
  setValues()

  useEffect(()=>{
    if(flagCreateOrEdit === 1){
      setButtonName('Editar')
      setTitleHeader('Editar lugar')
    } else if (flagCreateOrEdit === 0){
      setButtonName('Crear')
      setTitleHeader('Crear lugar')
    }
  }, [flagCreateOrEdit])

  if(flagCreateNotification === 1){
    ToastAndroid.show('Lugar creado exitosamente', ToastAndroid.SHORT)
    dispatcher(changeCreateNotification(0))
} else if (flagCreateNotification === 2){
    ToastAndroid.show('Error al intentar crear lugar', ToastAndroid.SHORT)
    dispatcher(changeCreateNotification(0))
}

if(flagEditNotification === 1){
  ToastAndroid.show('Lugar editado exitosamente', ToastAndroid.SHORT)
  dispatcher(changeEditNotification(0))
} else if (flagEditNotification === 2){
  ToastAndroid.show('Error al intentar editar lugar', ToastAndroid.SHORT)
  dispatcher(changeEditNotification(0))
}
  
  return (
    <View style={styles.container} >
      <Header leftIcon='arrow-back'  title={titleHeader} leftAction={()=>props.navigation.goBack()} props={props} />
      <Formik
     initialValues= {initialValues}
     validationSchema= {validationSchema}
     onSubmit={async (values) => {
      const place_json = JSON.stringify(createStructure(values))
      if(flagCreateOrEdit === 1){
        console.log('editar: ', flagCreateOrEdit)
        dispatcher(editPlace(place._id, place_json))
      } else if (flagCreateOrEdit === 0){
        console.log('crear: ', flagCreateOrEdit)
        dispatcher(creatPlace(place_json))
      }
    }}
   >
     {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
       <View style={styles.form} >
         <TextInput
          style={styles.text_input}
          placeholder='Nombre'
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           value={values.name}
         />
         {touched.name && errors.name &&
              <Text style={styles.text_error}>{errors.name}</Text>
            } 
        <TextInput
          style={styles.text_input}
          placeholder='Descripción'
           onChangeText={handleChange('description')}
           onBlur={handleBlur('description')}
           value={values.description}
         />
         {touched.description && errors.description &&
              <Text style={styles.text_error}>{errors.description}</Text>
            } 
         <TextInput
         style={styles.text_input}
         placeholder='URL de imagen'
           onChangeText={handleChange('imgUrl')}
           onBlur={handleBlur('imgUrl')}
           value={values.imgUrl}
         />
         {touched.imgUrl && errors.imgUrl &&
              <Text style={styles.text_error}>{errors.imgUrl}</Text>
            } 
         <TextInput
         style={styles.text_input}
         placeholder='Latitud'
           onChangeText={handleChange('latitude')}
           onBlur={handleBlur('latitude')}
           value={values.latitude}
         />
         {touched.latitude && errors.latitude &&
              <Text style={styles.text_error}>{errors.latitude}</Text>
            } 
         <TextInput
         style={styles.text_input}
         placeholder='Longitud'
           onChangeText={handleChange('longitude')}
           onBlur={handleBlur('longitude')}
           value={values.longitude}
         />
         {touched.longitude && errors.longitude &&
              <Text style={styles.text_error}>{errors.longitude}</Text>
            } 

         <View style={styles.button_container} >
          <Button style={styles.button} onPress={handleSubmit} title={buttonName} />
         </View>
       </View>
     )}
   </Formik>
    </View>
  )
 };