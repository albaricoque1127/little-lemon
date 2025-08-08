import { View, Text, FlatList, StyleSheet, TextInput, Image, ActivityIndicator } from 'react-native';
import Hero from '../components/Hero';
import { useState, useRef } from 'react';
import { fonts, sizes, characterSpacing, lineHeights } from '../styles/typography';
import { storeUserData, getUserData } from '../utils/storage';
import Footer from '../components/Footer'
import { useEffect } from 'react';
import { initDatabase, createTable, getMenuItems, saveMenuItems, dropMenuItemsTable, getCategories, filterByQueryAndCategories} from '../utils/database'
import CategoryFilter from '../components/CategoryFilters';
import {Ionicons} from '@expo/vector-icons';
import { useUpdateEffect } from '../utils/updatefilters';


export default function Menu({ userData, setUserData }) {
    
  const [categories, setCategories] = useState([]); // Holds the list of all categories
  const [searchQuery, setSearchQuery] = useState(''); // Tracks search input
  const [selectedCategories, setSelectedCategories] = useState([]); // Tracks selected categories
  const [menuItemsToDisplay, setMenuItemsToDisplay] = useState([]);
  const [filterQuery, setFilterQuery] = useState(''); // Tracks filter input
  const [isLoading, setLoading] = useState(false);
  
  //Function used to toggle category buttons to selected state and set selectedCategories state for the query
  const toggleCategory = cat => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }; 

  // Function used to fetch menu items from the API and patch incorrect image filename
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


  //Function used to get URL for images when rendering menu items
  const imageUrl = (imageFileName) => `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;


  //Function used to render each item in the FlatList
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

  // Separator function for FlatList
  const separator = () => (<View style={styles.separator} />);
                  
  // Effect to load data from the database or fetch from API when the component mounts 
  useEffect(() => {
    const loadDb = async () => {
      setLoading(true); // Start loading
      try {
        await initDatabase();
        await createTable();

        let menuItems = await getMenuItems();

        if (menuItems.length === 0) {
          console.log('No data in DB, fetching from API...');
          const fetchedData = await fetchMenu();
          await saveMenuItems(fetchedData);
          menuItems = await getMenuItems();
        }

        setMenuItemsToDisplay(menuItems);
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // End loading
      }
    };

    loadDb();
  }, []);


  // Effect to filter menu items when search query and selected categories change
  useUpdateEffect(() => {
    if (!categories.length) return;
    const filterMenuItems = async () => {
      try {
        console.log('Filtering menu items with query:', searchQuery, 'and categories:', selectedCategories); 
        const filteredItems = await filterByQueryAndCategories(searchQuery, selectedCategories);
        setMenuItemsToDisplay(filteredItems);
      } catch (error) {
        console.error('Error filtering menu items:', error);
      }
    };

    const timeoutId = setTimeout(filterMenuItems, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategories]);


  
  
  return (
    <View style={styles.container}>
      <Hero />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#495E57" />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <Ionicons name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Search for a dish"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
              clearButtonMode="always"
              keyboardType="default"
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
              keyExtractor={(item) => item.name}
              renderItem={renderMenuItem}
              ItemSeparatorComponent={separator}
              ListFooterComponent={<View style={{ height: 32 }} />}
            />
          </View>
        </>
      )}
      
    </View>
  );
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

  searchIcon: {
    position: 'absolute',
    left: 32,
    top: 10,
    zIndex: 10,
    color: '#333333',
    fontSize: 20,
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
        paddingLeft: 40,
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
    loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: sizes.cardTitle,
    fontFamily: fonts.cardTitle,
    fontWeight: 'bold',
    color: '#333',
  },
  
 
});