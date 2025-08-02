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
            console.error('❌ Failed to save menu items:', error);
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

export async function filterByQueryAndCategories(query, activeCategories) {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    // Log the input parameters
    console.log('Filtering with:', { query, activeCategories });

    let sql;
    let params = [];

    // Case 1: Both query and categories
    if (query && activeCategories.length > 0) {
      const categories = activeCategories.map(cat => `'${cat}'`).join(', ');
      sql = `SELECT * FROM menuitems WHERE LOWER(title) LIKE ? AND category IN (${categories})`;
      params = [`%${query.toLowerCase()}%`];
    }
    // Case 2: Only query
    else if (query) {
      sql = 'SELECT * FROM menuitems WHERE LOWER(title) LIKE ?';
      params = [`%${query.toLowerCase()}%`];
    }
    // Case 3: Only categories
    else if (activeCategories.length > 0) {
      const categories = activeCategories.map(cat => `'${cat}'`).join(', ');
      sql = `SELECT * FROM menuitems WHERE category IN (${categories})`;
    }
    // Case 4: No filters
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