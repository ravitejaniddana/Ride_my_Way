// backend/controllers/rideController.js
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

// Create a Ride (Driver)
exports.createRide = async (req, res) => {
  try {
    const { driverId, origin, destination, date, priceInPi, availableSeats } = req.body;
    
    // Add ride to Firestore
    await db.collection('rides').add({
      driver: driverId,
      origin,
      destination,
      date,
      priceInPi,
      availableSeats,
    });

    res.status(201).json({ message: 'Ride created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating ride' });
  }
};

// Get Available Rides (Passenger)
exports.getAvailableRides = async (req, res) => {
  try {
    const snapshot = await db.collection('rides').where('availableSeats', '>', 0).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No rides available' });
    }

    const rides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ rides });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching rides' });
  }
};
