import {openDatabaseAsync} from 'expo-sqlite';

let db;


export async function initDatabase() {
  try {
    db = await openDatabaseAsync('little-lemon.db');
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error);    
  }
}

export async function clearMenuItemsTable() {
  try {
    await db.execAsync('DELETE FROM menuitems');
    console.log('🧼 Cleared all rows from menuitems table');
  } catch (error) {
    console.error('❌ Failed to clear table:', error);
    throw error;
  }
}

export async function createTable() {
  try {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menuitems (
      id INTEGER PRIMARY KEY NOT NULL,
      uuid TEXT,
      title TEXT,
      price TEXT,
      category TEXT
    );
  `);
    
    console.log('Table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
    // You could also throw the error or return a custom message
    throw new Error('Failed to create menuitems table');
  }
}


export async function getMenuItems() {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    const rows = await db.getAllAsync('SELECT * FROM menuitems');
    console.log(`🗃️ Retrieved ${rows.length} menu items`);
    console.log(rows); // For a nice tabular display in the console

    return rows;
  } catch (error) {
    console.error('Error retrieving menu items:', error);
    throw error;
  }
}

export async function saveMenuItems(menuItems) {
  try {
    const statement = await db.prepareAsync(
      'INSERT INTO menuitems (uuid, title, price, category) VALUES ($uuid, $title, $price, $category)'
    );

    try {
      for (const item of menuItems) {
        await statement.executeAsync({
          $uuid: item.id.toString(),  // assuming you're mapping `id` to `uuid`
          $title: item.title,
          $price: item.price,
          $category: item.category,
        });
        console.log(`✅ Inserted item: ${item.title}`);
      }
    } finally {
      await statement.finalizeAsync(); // release resources
    }

    const rows = await db.getAllAsync('SELECT * FROM menuitems');
    console.log('🗃️ Menu items saved successfully:', rows);
    return true;
  } catch (error) {
    console.error('❌ Failed to save menu items:', error);
    throw error;
  }
}

//Filtering

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