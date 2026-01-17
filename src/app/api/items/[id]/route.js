import { NextResponse } from 'next/server';
import { fallbackOperations as dbOperations } from '@/lib/data-fallback';

// GET /api/items/[id] - Get single item
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const item = await dbOperations.getItem(id);
    
    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET /api/items/[id] error:', error);
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
    
    const updatedItem = await dbOperations.updateItem(id, {
      name,
      description,
      detailedSolution,
      category,
      difficulty,
      image
    });
    
    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error('PUT /api/items/[id] error:', error);
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
    const deleted = await dbOperations.deleteItem(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/items/[id] error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}