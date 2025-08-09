import {  ScrollView,  Pressable,  Text,  StyleSheet,  ActivityIndicator,  View,
} from 'react-native';
import { fonts, sizes } from '../styles/typography';

export default function CategoryFilter({ selectedCategories, onChange, categories }) {

        
    
    return (
    <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {categories.map(cat => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <Pressable
                key={cat}
                onPress={() => onChange(cat)} 
                style={[
                  styles.button,
                  isSelected ? styles.selected : styles.unselected,
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    isSelected ? styles.textSelected : styles.textUnselected,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    justifyContent: 'space-between'
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,    
  },
  selected: {
    backgroundColor: '#495E57',
  },

  unselected: {
    backgroundColor: '#EDEFEE',    
  },

  text: {
    fontFamily: fonts.sectionTitle,
    fontSize: sizes.categories,
    textTransform: 'capitalize',
  },
  textSelected: {
    color: '#EDEFEE',
  },
  textUnselected: {
    color: '#495E57',
  },
  errorContainer: {
    padding: 16,
  },
  errorText: {
    color: 'red',
  },
});