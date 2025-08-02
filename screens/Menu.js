import { View, Text, FlatList, StyleSheet, TextInput, Image, ScrollView, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Hero from '../components/Hero';
import { useState } from 'react';
import { fonts, sizes, characterSpacing, lineHeights } from '../styles/typography';
import { storeUserData, getUserData } from '../utils/storage';
import Footer from '../components/Footer'
import { useEffect } from 'react';
import { initDatabase, createTable, getMenuItems, saveMenuItems, dropMenuItemsTable, getCategories} from '../utils/database'
import CategoryFilter from '../components/CategoryFilters';
import {Ionicons} from '@expo/vector-icons';



export default function Menu({ userData, setUserData }) {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [menuItemsToDisplay, setMenuItemsToDisplay] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const toggleCategory = cat => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const fetchMenu = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
      const json = await response.json();
      
      
      //Patch incorrect image filename
      const fetchedData = json.menu.map(item => {
        if (item.name === 'Lemon Dessert') {
          return { ...item, image: 'lemonDessert 2.jpg' };
        }
        return item;
      });

      return fetchedData;

    } catch (error) {
      console.error(error);
      return [];        
    }
  };  


const loadDb = async () => {
    try{
      await initDatabase();
      await createTable();

      let menuItems = await getMenuItems(); // Load existing DB data

      if (menuItems.length ===0) {
        console.log('No data in DB, fetching from API...');
        const fetchedData = await fetchMenu();
        await saveMenuItems(fetchedData);
        menuItems = await getMenuItems(); //Refresh with newly inserted data
        setMenuItemsToDisplay(menuItems);

      } else {
        console.log(`found ${menuItems.length} items in DB`);
        setMenuItemsToDisplay(menuItems);
        const cats = await getCategories();
        setCategories(cats);
        console.log(categories)
      }
    } catch (error) {
      console.error(error);
    }
  };

  

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
    loadDb();
    
  },[]);

  console.log(menuItemsToDisplay);


  
  return (    
    <View style={styles.container}>   
      <Hero />
      <View style={styles.searchContainer} >
        <Ionicons
          name="search"
          size={20}
          color="#555"
          style={styles.absoluteIcon}
        />
        <TextInput 
          style={styles.input}
        />        
      </View>       
              
      <View style={styles.contentContainer}>                                

        <Text style={styles.sectionTitle}>ORDER FOR DELIVERY!</Text>

        <CategoryFilter
          selectedCategories={selectedCategories}
          onChange={toggleCategory}
          categories={categories}
        /> 
        
        <FlatList
          data={menuItemsToDisplay}
          keyExtractor={item => item.name}
          renderItem={renderMenuItem}
          ItemSeparatorComponent={separator}
          ListFooterComponent={<View style={{height: 32}}/>}
                        
        />            
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
  searchContainer:{
    backgroundColor: '#495E57',
    paddingHorizontal: 25,
  },

  absoluteIcon: {
    position: 'absolute',
    left: 32,
    top: 10,
    zIndex: 10,
  },
  input: {
        height: 40,
        width: '100%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        fontSize: sizes.paragraph,
        fontFamily: fonts.body,  
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