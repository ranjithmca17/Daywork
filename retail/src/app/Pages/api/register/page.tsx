// pages/api/register.js
import axios from 'axios';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await axios.post('http://localhost:5000/api/auth/register', {
      name,
      email,
      password,
    });

    return NextResponse.json({ message: 'User registered.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while registering the user.' },
      { status: 500 }
    );
  }
}
