import { NextResponse } from 'next/server';
import { fallbackOperations as dbOperations } from '@/lib/data-fallback';

// GET /api/items - Get all items
export async function GET() {
  try {
    const items = await dbOperations.getItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('GET /api/items error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// POST /api/items - Create new item
export async function POST(request) {
  try {
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
    
    const newItem = await dbOperations.createItem({
      name,
      description,
      detailedSolution: detailedSolution || '',
      category,
      difficulty,
      image: image || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'
    });
    
    return NextResponse.json(
      { success: true, item: newItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/items error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}