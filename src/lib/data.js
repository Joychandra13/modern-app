// Data utilities for Next.js API routes
// All data operations go through Next.js API routes with file-based JSON storage

// Fetch all items from the API
export async function getItems() {
  try {
    const response = await fetch('/api/items', {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

// Fetch a single item by ID
export async function getItem(id) {
  try {
    const response = await fetch(`/api/items/${id}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}

// Add a new item
export async function addItem(itemData) {
  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add item');
    }
    
    return data;
  } catch (error) {
    console.error('Error adding item:', error);
    return { success: false, message: error.message };
  }
}

// Update an existing item
export async function updateItem(id, itemData) {
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update item');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating item:', error);
    return { success: false, message: error.message };
  }
}

// Delete an item
export async function deleteItem(id) {
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete item');
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting item:', error);
    return { success: false, message: error.message };
  }
}

// Initialize function (creates default data on first API call)
export function initializeItems() {
  // Items are now initialized by the Next.js API routes
  console.log('Items are managed by Next.js API routes with file-based storage');
}