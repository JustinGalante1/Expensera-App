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
        bodyContainer:{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            backgroundColor: 'green',
            top: 10,
            resizeMode: 'cover',
            height: '100%'
        },
        centerContainer:{
            flex:1, 
            alignItems:'center', 
            justifyContent:'center'
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
        }
    }
)