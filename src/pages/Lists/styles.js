import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0fa',
    },

    header: {
        padding: 20,
        paddingTop: Constants.statusBarHeight + 30,
        flexDirection: 'row',
        backgroundColor: '#7f2bb6',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },

    headerText: {
        fontSize: 16,
        color: '#fff',
    },

    headerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff',

        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 70,
            height: 7,
        },
        shadowOpacity: 1,
        shadowRadius: 9.11,
        elevation: 8,
    },

    headerInput:{ 
        height: 50,
        minWidth: '85%',
        maxWidth: '85%',
        paddingLeft: 10,
        paddingRight: 10
    },

    headerButton: {
        backgroundColor: '#f0f0fa',
        width: 50,
        height: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        paddingTop: 15,
    },

    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: '#7f2bb6',
        borderTopColor: '#641c94',
        borderTopWidth: 1,
        margin: 0,
        height: 52,
    },

    listText: {
        color: '#fff'
    },

    listButton: {
        padding: 20,
    },

    footer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#efefef'
    },

    footerText: {
        fontSize: 16,
    }
});

export default styles;