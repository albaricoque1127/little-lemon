import { View, Text, FlatList, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Hero from '../components/Hero';
import { useState } from 'react';
import { fonts, sizes, characterSpacing, lineHeights } from '../styles/typography';
import { storeUserData, getUserData } from '../utils/storage';
import Footer from '../components/Footer'
import { useEffect } from 'react';



export default function Menu({ userData, setUserData }) {

  const [menuItemsToDisplay, setMenuItemsToDisplay] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMenu = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
      const json = await response.json();
      
      
      //Patch incorrect image filename
      const patchedMenu = json.menu.map(item => {
        if (item.name === 'Lemon Dessert') {
          return { ...item, image: 'lemonDessert 2.jpg' };
        }
        return item;
      });

      setMenuItemsToDisplay(patchedMenu);

    } catch (error) {
      console.error(error);        
    } finally {
      setLoading(false);
    }
  }

  const imageUrl = (imageFileName) => `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;

  const renderMenuItem = ({item}) => (
    <View style={styles.card} >
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.body}>{item.description}</Text>
        <Text style={styles.highlight}>${item.price}</Text>
      </View>
      <View>
        <Image
          source={{uri: imageUrl(item.image)}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );

  const separator = () => (<View style={styles.separator} />);

                
  useEffect(()=>{
    getMenu();},[]);

  console.log(menuItemsToDisplay);


  
  return (
    <View style={styles.container} >
     
      
        <View 
          style={styles.scrollView} 
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={true}
          indicatorStyle='white'>

          <Hero />      
          <View style={styles.contentContainer}>

            <Text style={styles.sectionTitle}>ORDER FOR DELIVERY!</Text>
            
            <FlatList
              data={menuItemsToDisplay}
              keyExtractor={item => item.name}
              renderItem={renderMenuItem}
              ItemSeparatorComponent={separator}
              ListFooterComponent={<View style={{height: 32}}/>}

            />
            
          </View>
          
        </View>
      
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: sizes.sectionTitle,
    fontFamily: fonts.sectionTitle,
    marginVertical: 20,
    fontWeight: 'bold',
  },

  card: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  textContainer:{
    flex:1, 
    marginRight: 20,
  },
  cardTitle:{
    fontSize: sizes.cardTitle,
    fontFamily: fonts.cardTitle,
    fontWeight: 'bold'
  },
  body:{
    fontSize: sizes.paragraph,
    fontFamily: fonts.body,
    marginVertical: 16,
    maxHeight: 40,
  }, 
  highlight:{
    fontSize: sizes.highlight,
    fontFamily: fonts.highlight,
  },
  image: {
    height: 80,
    width: 80,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    
  },
  
 
});