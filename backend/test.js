import sequelize from './config/database.js'; // ✅ Use default import instead of named import
import { User, Booking, Cinema, Film, Screen, Showtime } from './models/index.js';

const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    /*** 🔹 Step 1: Create Sample Data ***/
    console.log('\n🔹 Creating sample data...');
    
    // Create a Cinema
    const cinema = await Cinema.create({ city: 'London', location: 'Central Mall', screen_count: 3 });
    
    // Create Screens for the Cinema
    const screen1 = await Screen.create({ cinema_id: cinema.cinema_id, screen_number: 1, seating_capacity: 100 });
    const screen2 = await Screen.create({ cinema_id: cinema.cinema_id, screen_number: 2, seating_capacity: 80 });

    // Create a Film
    const film = await Film.create({ title: 'Inception', description: 'A mind-bending thriller.', genre: 'Sci-Fi', rating: 'PG-13', duration: 148 });

    // Create Showtimes for the Film on Screen 1
    const showtime1 = await Showtime.create({ film_id: film.film_id, screen_id: screen1.screen_id, showtime: '2025-02-20T10:00:00Z', seating_type: 'Lower Hall', price: 10.00 });
    const showtime2 = await Showtime.create({ film_id: film.film_id, screen_id: screen1.screen_id, showtime: '2025-02-20T19:00:00Z', seating_type: 'VIP', price: 14.40 });

    // Create a User
    const user = await User.create({ username: 'john_doe', password_hash: 'hashedpassword', role: 'Booking Staff' });

    // Create a Booking
    const booking = await Booking.create({ user_id: user.user_id, showtime_id: showtime1.showtime_id, seat_numbers: 'A1,A2', total_price: 20.00 });

    console.log('✅ Sample data created successfully!');

    /*** 🔹 Step 2: Retrieve Data with Associations ***/
    console.log('\n🔹 Retrieving data with associations...');

    // Fetch all cinemas with their screens
    const cinemas = await Cinema.findAll({ include: Screen });
    console.log('🏢 Cinemas with Screens:', JSON.stringify(cinemas, null, 2));

    // Fetch all films with their showtimes
    const films = await Film.findAll({ include: Showtime });
    console.log('🎬 Films with Showtimes:', JSON.stringify(films, null, 2));

    // Fetch a specific booking with user and showtime details
    const userBooking = await Booking.findOne({ where: { booking_id: booking.booking_id }, include: [{ model: User }, { model: Showtime, include: [{ model: Screen, include: [Cinema] }, Film] }] });
    console.log('🎟 User Booking Details:', JSON.stringify(userBooking, null, 2));

    /*** 🔹 Step 3: Clean Up (Optional) ***/
    console.log('\n🔹 Cleaning up test data...');
    await Booking.destroy({ where: {} });
    await Showtime.destroy({ where: {} });
    await Film.destroy({ where: {} });
    await Screen.destroy({ where: {} });
    await Cinema.destroy({ where: {} });
    await User.destroy({ where: {} });

    console.log('✅ Test data cleanup completed!');

  } catch (error) {
    console.error('❌ Error in testing database relationships:', error);
  } finally {
    await sequelize.close();
    console.log('✅ Database connection closed.');
  }
};

testDatabase();