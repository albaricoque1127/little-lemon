import {View, Text, Pressable, StyleSheet} from 'react-native';
import {fonts, sizes} from '../styles/typography';

export function YellowButton({title, onPress, disabled=false}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.yellowButton,
        pressed && styles.yellowPressed,
        disabled && styles.yellowDisabled,
      ]}>
      {({ pressed }) => (
        <Text
          style={[
            styles.yellowButtonText,
            pressed && styles.yellowButtonTextPressed,
            disabled && styles.yellowButtonTextDisabled,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

export function GreenButton({title, onPress, disabled=false}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.greenButton,
        pressed && styles.greenPressed,
        disabled && styles.greenDisabled,
      ]}>
      {({ pressed }) => (
        <Text
          style={[
            styles.greenButtonText,
            pressed && styles.greenButtonTextPressed,
            disabled && styles.greenButtonTextDisabled,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  yellowButton: {
    backgroundColor: '#F4CE14', // bright yellow
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    height: 35,
    alignSelf: 'center',      // ← prevents stretching
  },
    yellowPressed: {
        backgroundColor: '#EE9972', // light orange
    },
    yellowDisabled: {
        backgroundColor: '#EDEFEE',
        opacity: 0.5,
    },
    yellowButtonText: {
        fontSize: sizes.categories,
        fontFamily: fonts.categories,
        fontWeight: 'bold',
        color: '#333333',
    },
    yellowButtonTextDisabled: {
        color: '#333333',
    },
    yellowButtonTextPressed: {
        color: '#333333',
    },
    greenButton: {
    backgroundColor: '#495E57', // dark green
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    maxWidth: 180, // Prevents stretching
  },
    greenPressed: {
        backgroundColor: '#ffffffff', //light orange,
        outlineColor: '#495E57',
        outlineWidth: 1,
    },
    greenDisabled: {
        backgroundColor: '#EDEFEE',
        opacity: 0.5,
    },
    greenButtonText: {
        fontSize: sizes.categories,
        fontFamily: fonts.categories,
        fontWeight: 'bold',
        color: '#ffffffff',
    },
    greenButtonTextDisabled: {
        color: '#495E57',
    },
    greenButtonTextPressed: {
        color: '#495E57',
    },
});