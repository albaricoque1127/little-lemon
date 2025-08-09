import {  View, Text, Pressable, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, sizes } from '../styles/typography';

export default function EmailNotifications({
  options,
  prefs,
  onToggle
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        EMAIL NOTIFICATIONS
      </Text>

      {options.map(({ id, label }) => (
        <Pressable
          key={id}
          style={styles.row}
          onPress={() => onToggle(id)}
          android_ripple={{ color: '#ccc' }}
        >
          <Ionicons
            style={styles.checkbox}
            name={
              prefs[id]
                ? 'checkbox'
                : 'square-outline'
            }
            color={prefs[id] ? '#495E57' : '#666'}
            size={24}
          />
          <Text style={styles.label}>
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: sizes.sectionTitle,
        fontFamily: fonts.sectionTitle,
        marginVertical: 20,
        fontWeight: 'bold',
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 16,
        
    },
    checkbox: {
        marginRight: 16,
    },
    label: { 
        fontSize: sizes.lead,
        fontFamily: fonts.body,
        
    },
});