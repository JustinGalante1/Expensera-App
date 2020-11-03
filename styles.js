import { StyleSheet } from 'react-native';

export const HeaderStyle = StyleSheet.create(
    {
        headerContainer:{
            height: 80,
            width: "100%",
            backgroundColor: '#4a4a4a',
            justifyContent: 'flex-end',
            shadowColor: 'grey',
            shadowOpacity: 100,
            shadowOffset: {width: 0, height: 4.5},
        },
        title: {
            marginBottom: 5,
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
            alignSelf: 'center',
        },
    }
)