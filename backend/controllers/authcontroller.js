// backend/controllers/authController.js
const { getFirestore } = require('firebase-admin/firestore');
const bcrypt = require('bcryptjs');

// Firestore instance
const db = getFirestore();

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Add user to Firestore
    await db.collection('users').add({
      name,
      email,
      password: hashedPassword,
      role: 'passenger', // Default role
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Query Firestore for user by email
    const snapshot = await db.collection('users').where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = snapshot.docs[0].data();

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

// Switch Role Controller
exports.switchRole = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get the user document
    const userDoc = db.collection('users').doc(userId);
    const user = await userDoc.get();

    if (!user.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newRole = user.data().role === 'driver' ? 'passenger' : 'driver';

    // Update the user's role in Firestore
    await userDoc.update({ role: newRole });

    res.status(200).json({ message: 'Role switched successfully', role: newRole });
  } catch (error) {
    res.status(400).json({ error: 'Error switching role' });
  }
};
