import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        // padding: 10,
        // marginTop: 80
      },
    form: {
      padding: 10,
      marginTop: 130
    },
    text_input: {
      borderWidth: 1,
      borderColor: '#398290',
      borderRadius: 5,
      marginTop: 10,
    },
    text_error: {
      fontSize: 12, color: '#FF0D10'
    },
    button_container: {
      marginTop: 10
    }
})