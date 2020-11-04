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
        },
        textInputLogin:{
            height: 40,
            borderColor: '#2fc547',
            borderWidth: 1,
            backgroundColor: 'white'
        },
        textInputModal:{
            height: 40,
            borderColor: '#2fc547',
            borderWidth: 1,
            backgroundColor: '#2fc547',
            width: '100%',
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