import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Data file path
const DATA_FILE = path.join(process.cwd(), 'data', 'items.json');

// Helper functions
const readItems = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeItems = async (items) => {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2));
};

// GET /api/items/[id] - Get single item
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const items = await readItems();
    const item = items.find(item => item.id === parseInt(id));
    
    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// PUT /api/items/[id] - Update item
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, description, detailedSolution, category, difficulty, image } = await request.json();
    
    if (!name || !description || !category || !difficulty) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, description, category, and difficulty are required'
        },
        { status: 400 }
      );
    }
    
    const items = await readItems();
    const index = items.findIndex(item => item.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }
    
    items[index] = {
      ...items[index],
      name,
      description,
      detailedSolution,
      category,
      difficulty,
      image,
      updatedAt: new Date().toISOString()
    };
    
    await writeItems(items);
    
    return NextResponse.json({ success: true, item: items[index] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/items/[id] - Delete item
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const items = await readItems();
    const index = items.findIndex(item => item.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }
    
    items.splice(index, 1);
    await writeItems(items);
    
    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}