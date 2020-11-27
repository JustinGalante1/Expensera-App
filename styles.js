import { StyleSheet } from 'react-native';

export const HeaderStyle = StyleSheet.create(
    {
        headerContainer:{
            height: 40,
            width: "100%",
            backgroundColor: '#4a4a4a',
            justifyContent: 'flex-end',
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: 6.0},
            shadowRadius: 1,
        },
        title: {
            marginBottom: 5,
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
            alignSelf: 'center',
        },
        drawerIcon:{
            position: 'absolute',
            left: 16,
            color: 'white',
        }
    }
);

export const PageStyle = StyleSheet.create(
    {
        centerContainer:{
            flex:1, 
            alignItems:'center', 
            justifyContent:'center',
        },
        cardHeader:{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#4a4a4a',
        },
        cardFooter:{
            display: 'flex',
            width: '100%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        },
        textInputLogin:{
            backgroundColor: 'white',
            width: '70%',
            marginBottom: 10,
        },
        textInputModal:{
            height: 40,
            borderColor: '#2fc547',
            borderWidth: 1,
            backgroundColor: '#2fc547',
            width: '100%',
        },
        titleText:{
            textAlign: 'center',
            color: "white",
            width: '100%',
            height: '60%',
            textShadowColor: 'black', 
            textShadowOffset: { width: -1, height: 0 },
            textShadowRadius: 10, 
            fontWeight: '400',
            fontSize: 30,
            paddingTop: 100,
        },
        subTitleText:{
            textAlign: 'center',
        }
    }
);

export const ButtonStyle = StyleSheet.create(
    {
        addButtonWhite:{
            backgroundColor: 'white'
        },
        addButtonGreen:{
            backgroundColor: '#2fc547'
        }
    }
)