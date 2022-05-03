import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(0,0,0,0.2)',
      },
      title: {
        color: '#398290',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 130
      },
      container__image: {
        flex: 1,
        margin: '3%',
      },
      image: {
        width: "100%",
        height: "100%"
      },
      container__information: {
        flex: 1,
        alignItems: "flex-start",
        margin: '3%',
        marginTop: 0,
        backgroundColor: 'white'
      },
      information: {
        // backgroundColor: "black",
        width: '100%'
      },
      text__information__container: {
        // margin: '2%',
        flexDirection: 'row',
        padding: '2%',
        backgroundColor: 'white',
      },
      text__information: {
        color: '#398290',
        fontWeight: 'bold',
      },

})