import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        users: [],
        message: 'User service placeholder is ready.',
        timestamp: new Date().toISOString(),
    });
}

export async function POST(request: Request) {
    const payload = await request.json();

    return NextResponse.json(
        {
            message: 'User created successfully',
            user: payload,
            timestamp: new Date().toISOString(),
        },
        { status: 201 }
    );
}
