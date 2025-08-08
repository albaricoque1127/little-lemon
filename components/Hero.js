import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { fonts, sizes } from '../styles/typography';

export default function Hero() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.heroContainer}>
        <Text style={styles.title}>Little Lemon</Text>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Chicago</Text>
            <Text style={styles.description}>
              We are a family owned Mediterranean restaurant, 
              focused on traditional recipes served with a modern twist.
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/Hero image.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    heroContainer: {
        backgroundColor: '#495E57',
        paddingHorizontal: 25,
        paddingVertical: 24,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
        marginRight: 12,
    },
    title: {
        fontSize: sizes.displayTitle,
        fontFamily: fonts.displayTitle,
        color: '#F4CE14',
        lineHeight: 64,
    },
    subtitle: {
        fontSize: sizes.subtitle,
        fontFamily: fonts.subtitle,
        color: '#FFFFFF',
        lineHeight: 40,
        marginTop: -16, // Adjust spacing between title and subtitle
    },
    description: {
        fontSize: sizes.lead,
        fontFamily: fonts.lead,
        color: '#FFFFFF',
        marginTop: 16,
        lineHeight: 20,
    },
    imageContainer: {
        width: 145,
        height: 145,
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 8, // Align with the title
    },
    heroImage: {
        width: '100%',
        height: '100%',
    }
});