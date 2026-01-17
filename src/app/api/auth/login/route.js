import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Mock authentication - hardcoded credentials
    if (email === 'admin@example.com' && password === '123456') {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { 
          email, 
          loginTime: new Date().toISOString() 
        }
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials'
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Server error'
      },
      { status: 500 }
    );
  }
}