import React, { Component, useCallback } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Header as HeaderRN, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { theme } from '../constants'
import { changeFlagCreateOrEdit } from '../redux/appRedux';
// import { styles } from './styles'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default Header = ({leftIcon, leftAction, title, props}) => {
    // const { colors, headerHeight } = theme
    // const { leftIcon, leftAction, title } = props

    const dispatcher = useDispatch()
    
    const handleCreateButton = async () => {
        await dispatcher(changeFlagCreateOrEdit(0));
        props.navigation.navigate("Form")
    }

    return(
        <View style={{position: "absolute", top:0, zIndex:2}}>
            <HeaderRN
                barStyle='light-content'
                // containerStyle={{height:headerHeight}}
                backgroundColor= '#398290'
                leftComponent={leftIcon?
                        (
                            <TouchableOpacity
                                style={{ marginLeft: 10 }}
                                onPress={leftAction?()=>leftAction():false}
                            >
                        <Icon type="material" name={leftIcon} color="white" size={30} />
                        </TouchableOpacity>
                        )
                        :
                        {
                icon: 'menu',
                color: '#fff',
                }}
                rightComponent={
                    <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => handleCreateButton()}
                    >
                        <Icon type="antdesign" name="form" color="white" />
                    </TouchableOpacity>
                    </View>
                }
                centerComponent={{ text: title?title:'Pilar Tecno', style: styles.heading }}
            />
        </View>
    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
      },
    buttonContent: {
        width: width/3,
        height: width/3,
        margin:10,
        borderRadius:5,
        justifyContent:'center',
        alignItems: 'center',
        // opacity: .5
    },
    mainContent: {
        flex: 1,
        width,
        height,
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    rowConten: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color:'white',
        width: '100%',
        textAlign: 'center',
        fontSize:18,
        fontWeight: 'bold',

    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
      },
      heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
      },
      subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
})