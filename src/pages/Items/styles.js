import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0fa',
    },

    headerName: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#7f2bb6',
        fontSize: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerNameText: {
        color: '#fff',
        fontSize: 20
    },

    header: {
        padding: 20,
        paddingTop: 12,
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
        marginLeft: -8,
        alignItems: 'center',
        paddingTop: 15,
    },

    headerButtonBack: {
        backgroundColor: '#641c94',
        width: 38,
        height: 38,
        alignItems: 'center',
        paddingTop: 8,
        borderRadius: 5,
        marginRight: 12,
    },

    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        margin: 0,
        height: 52,
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