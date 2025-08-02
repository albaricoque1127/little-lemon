import {View, StyleSheet} from 'react-native';
import { YellowButton } from '../components/Button';


export default function Footer({ title, onPress, disabled=false }) {
    return (
        <View style={styles.footer}>
        <YellowButton
            title={title}
            onPress={onPress}
            disabled={disabled}
        />
        </View>
    )
};

const styles = StyleSheet.create({
    footer: {
        
        width: '100%',
        paddingVertical: 24,
        backgroundColor: '#495E57',
        alignItems: 'center',
    },
});