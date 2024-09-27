// backend/controllers/bookingController.js
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

// Book a Ride (Passenger)
exports.bookRide = async (req, res) => {
  try {
    const { rideId, passengerId, seatsBooked } = req.body;
    
    // Get the ride
    const rideDoc = db.collection('rides').doc(rideId);
    const ride = await rideDoc.get();

    if (!ride.exists || ride.data().availableSeats < seatsBooked) {
      return res.status(400).json({ error: 'Not enough available seats' });
    }

    // Add booking to Firestore
    await db.collection('bookings').add({
      ride: rideId,
      passenger: passengerId,
      seatsBooked,
      status: 'pending',
    });

    // Update ride available seats
    await rideDoc.update({
      availableSeats: ride.data().availableSeats - seatsBooked,
    });

    res.status(201).json({ message: 'Ride booked successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error booking ride' });
  }
};

// Get Bookings (Passenger)
exports.getBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Query Firestore for bookings of the passenger
    const snapshot = await db.collection('bookings').where('passenger', '==', userId).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No bookings found' });
    }

    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching bookings' });
  }
};
