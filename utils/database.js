import {openDatabaseAsync} from 'expo-sqlite';

let db;


export async function initDatabase() {
    try {
        db = await openDatabaseAsync('little-lemon.db');
        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize database:', error);    
    }
};

export async function clearMenuItemsTable() {
    try {
        await db.execAsync('DELETE FROM menuitems');
        console.log('Cleared all rows from menuitems table');
    } catch (error) {
        console.error('Failed to clear table:', error);
        throw error;
    }
};

export async function createTable() {
    try {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS menuitems (
        id INTEGER PRIMARY KEY NOT NULL,
        category TEXT,
        description TEXT,
        image TEXT,
        name TEXT,
        price TEXT
        );`);
        
        console.log('Table created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
        }
};

export async function dropMenuItemsTable() {
    try {
        await db.execAsync('DROP TABLE IF EXISTS menuitems');
        console.log('Table has been deleted');
    } catch (error) {
        console.error('Error deleting table', error);
        throw error;
    }
};

export async function getMenuItems() {
    try {
        if (!db) {
        throw new Error('Database not initialized');
        }

        const rows = await db.getAllAsync('SELECT * FROM menuitems');
        console.log(`Retrieved ${rows.length} menu items`);
        console.log(rows); //see tables rows in console

        return rows;
    } catch (error) {
        console.error('Error retrieving menu items:', error);
        throw error;
    }
}

export async function saveMenuItems(menuItems) {
  try {
    const statement = await db.prepareAsync(
      'INSERT INTO menuitems (category, description, image, name, price) VALUES ($category, $description, $image, $name, $price)'
    );

    try {
      for (const item of menuItems) {
        await statement.executeAsync({
          $category: item.category,  
          $description: item.description,
          $image: item.image,
          $name: item.name,
          $price: item.price.toString()
        });
        console.log(`Inserted item: ${item.name}`);
      }
    } finally {
      await statement.finalizeAsync(); // release resources
    }

    const rows = await db.getAllAsync('SELECT * FROM menuitems');
        console.log('Menu items saved successfully:', rows);
            return true;
        } catch (error) {
            console.error('Failed to save menu items:', error);
            throw error;
        }
}

//Filtering

//Get category array for filters
export async function getCategories() {
        try {
            if (!db) {
            throw new Error('Database not initialised');
            }

            // 1. Fetch raw rows: [{ category: 'Appetizers' }, …]
            const rows = await db.getAllAsync(
            'SELECT DISTINCT category FROM menuitems;'
            );

            // 2. Map to extract just the string values
            const categories = rows.map(({ category }) => category);

            return categories;
        } catch (error) {
            console.error(error);
            // 3. Return an empty array on error for a consistent return type
            return [];
        }
    };

// Filter function to get menu items based on search query and selected categories
export async function filterByQueryAndCategories(searchQuery, selectedCategories) {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    // Log the input parameters
    console.log('Filtering with:', { searchQuery, selectedCategories });

    let sql;
    let params = [];

    // Case 1: User entered both search query and selected categories
    if (searchQuery && selectedCategories.length > 0) {
      const categories = selectedCategories.map(cat => `'${cat}'`).join(', ');
      sql = `SELECT * FROM menuitems WHERE LOWER(name) LIKE ? AND category IN (${categories})`;
      params = [`%${searchQuery.toLowerCase()}%`];
    }
    // Case 2: User entered only search query
    else if (searchQuery) {
      sql = 'SELECT * FROM menuitems WHERE LOWER(name) LIKE ?';
      params = [`%${searchQuery.toLowerCase()}%`];
    }
    // Case 3: User only selected categories
    else if (selectedCategories.length > 0) {
      const categories = selectedCategories.map(cat => `'${cat}'`).join(', ');
      sql = `SELECT * FROM menuitems WHERE category IN (${categories})`;
    }
    // Case 4: No filters applied
    else {
      sql = 'SELECT * FROM menuitems';
    }

    // Execute query and log results
    const result = await db.getAllAsync(sql, params);
    console.log('Filter results:', {
      sql,
      params,
      count: result?.rows?.length || 0,
      items: result?.rows || []
    });

    return result;
  } catch (error) {
    console.error('Filter error:', error);
    throw error;
  }
}

