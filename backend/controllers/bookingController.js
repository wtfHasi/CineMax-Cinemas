import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define a mapping from display names to enum values
const seatingTypeMap = {
  'Lower Hall': 'Lower_Hall',
  'Upper Gallery': 'Upper_Gallery',
  'VIP': 'VIP'
};

// Define the calculatePrice function
const calculatePrice = (seatingType, basePrice) => {
  switch(seatingType) {
    case 'VIP':
    case 'VIP':
      return basePrice * 1.44; // 20% premium for VIP compared to Upper Gallery
    case 'Upper Gallery':
    case 'Upper_Gallery':
      return basePrice * 1.2; // 20% premium for Upper Gallery
    case 'Lower_Hall':
    case 'Lower_Hall': 
      return basePrice; // Base price for Lower Hall
    default:
      return basePrice;
  }
};

const BookingController = {
  calculatePrice,

  createBooking: async (req, res) => {
    try {
      const { user_id, showtime_id, seat_numbers, seating_type } = req.body;
      
      // Convert the display name to enum value if needed
      const prismaSeatingType = seatingTypeMap[seating_type] || seating_type;
      
      const seatNumbersArray = seat_numbers.split(',');
  
      const booking = await prisma.$transaction(async (prisma) => {
        // 1. Check seat validity and availability
        const seats = await prisma.seat.findMany({
          where: {
            showtime_id: Number(showtime_id),
            seating_type, // Use the original value for querying seats
            seat_number: { in: seatNumbersArray },
            booking_id: null
          }
        });
  
        if (seats.length !== seatNumbersArray.length) {
          throw new Error('Invalid seats or some seats are already booked');
        }
  
        // 2. Calculate price
        const showtime = await prisma.showtime.findUnique({ 
          where: { showtime_id: Number(showtime_id) } 
        });
        
        if (!showtime) {
          throw new Error('Showtime not found');
        }
        
        let seatPrice = calculatePrice(seating_type, showtime.base_price);
  
        // 3. Create booking - use the converted enum value
        const newBooking = await prisma.booking.create({
          data: { 
            user_id: Number(user_id), 
            showtime_id: Number(showtime_id), 
            seat_numbers, 
            seating_type: prismaSeatingType, // Use the enum value
            total_price: seatPrice * seatNumbersArray.length 
          }
        });
  
        // 4. Reserve seats atomically
        await prisma.seat.updateMany({
          where: { 
            showtime_id: Number(showtime_id), 
            seating_type, // Use the original value for querying seats 
            seat_number: { in: seatNumbersArray } 
          },
          data: { booking_id: newBooking.booking_id }
        });
  
        return newBooking;
      });
  
      res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;
  
      await prisma.$transaction(async (prisma) => {
        const booking = await prisma.booking.findUnique({ where: { booking_id: Number(id) } });
        if (!booking) throw new Error('Booking not found');
  
        // Release seats
        await prisma.seat.updateMany({
          where: { booking_id: booking.booking_id },
          data: { booking_id: null }
        });
  
        await prisma.booking.delete({ where: { booking_id: Number(id) } });
      });
  
      res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          user: { select: { username: true, role: true } },
          showtime: {
            include: { film: true, screen: { include: { cinema: true } } }
          }
        }
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default BookingController;