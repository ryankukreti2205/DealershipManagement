const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Bike = require('./models/Bike');
const SparePart = require('./models/SparePart');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Bike.deleteMany();
        await SparePart.deleteMany();

        // Let's create users one by one for pre hooks to hash passwords natively
        let adminUser = new User({
            name: 'Admin User',
            email: 'admin@triumph.com',
            password: 'password123',
            role: 'Admin',
        });
        await adminUser.save();

        let customerUser = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'Customer',
        });
        await customerUser.save();

        const PLACEHOLDER = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80';

        const sampleBikes = [
            {
                name: 'Speed 400',
                price: 234000,
                image: PLACEHOLDER,
                specs: { engine: '398cc liquid-cooled single', power: '40 PS', torque: '37.5 Nm', weight: '170 kg' }
            },
            {
                name: 'Scrambler 400 X',
                price: 264000,
                image: PLACEHOLDER,
                specs: { engine: '398cc liquid-cooled single', power: '40 PS', torque: '37.5 Nm', weight: '179 kg' }
            },
            {
                name: 'Daytona 660',
                price: 972000,
                image: PLACEHOLDER,
                specs: { engine: '660cc inline 3-cylinder', power: '95 PS', torque: '69 Nm', weight: '201 kg' }
            },
            {
                name: 'Trident 660',
                price: 825000,
                image: PLACEHOLDER,
                specs: { engine: '660cc inline 3-cylinder', power: '81 PS', torque: '64 Nm', weight: '189 kg' }
            },
            {
                name: 'Street Triple 765 RS',
                price: 1181000,
                image: PLACEHOLDER,
                specs: { engine: '765cc inline 3-cylinder', power: '130 PS', torque: '80 Nm', weight: '188 kg' }
            },
            {
                name: 'Bonneville T120 Black',
                price: 1139000,
                image: PLACEHOLDER,
                specs: { engine: '1200cc parallel twin', power: '80 PS', torque: '105 Nm', weight: '236 kg' }
            },
            {
                name: 'Scrambler 1200 XE',
                price: 1223000,
                image: PLACEHOLDER,
                specs: { engine: '1200cc parallel twin', power: '90 PS', torque: '110 Nm', weight: '230 kg' }
            },
            {
                name: 'Tiger 900 Rally Pro',
                price: 1600000,
                image: PLACEHOLDER,
                specs: { engine: '888cc inline 3-cylinder', power: '108 PS', torque: '90 Nm', weight: '228 kg' }
            },
            {
                name: 'Tiger 1200 GT Explorer',
                price: 2168000,
                image: PLACEHOLDER,
                specs: { engine: '1160cc inline 3-cylinder', power: '150 PS', torque: '130 Nm', weight: '255 kg' }
            },
            {
                name: 'Rocket 3 Storm R',
                price: 2199000,
                image: PLACEHOLDER,
                specs: { engine: '2458cc inline 3-cylinder', power: '182 PS', torque: '225 Nm', weight: '317 kg' }
            }
        ];

        await Bike.insertMany(sampleBikes);

        const sampleParts = [
            { name: 'Brembo Stylema Brake Pads (Front)', price: 12500, stock: 40, image: 'https://images.unsplash.com/photo-1606686125439-d04b6b6e4e0b?w=800&q=80' },
            { name: 'Premium O-Ring Chain & Sprocket Kit', price: 28500, stock: 15, image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&q=80' },
            { name: 'Triumph Genuine Oil Filter', price: 1850, stock: 150, image: 'https://images.unsplash.com/photo-1612800537153-91c850fb893f?w=800&q=80' },
            { name: 'Machined Bar End Mirrors', price: 14000, stock: 30, image: 'https://images.unsplash.com/photo-1582297121650-ec9a2affcba3?w=800&q=80' },
            { name: 'Tiger Expedition Aluminum Panniers', price: 89900, stock: 10, image: 'https://images.unsplash.com/photo-1493238792000-8113e8dbbf32?w=800&q=80' },
            { name: 'Heated Grips Kit', price: 21000, stock: 25, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80' },
            { name: 'Engine Protection Crash Bars', price: 34500, stock: 20, image: 'https://images.unsplash.com/photo-1558980394-0a37b3b9b4ee?w=800&q=80' }
        ];

        await SparePart.insertMany(sampleParts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Bike.deleteMany();
        await SparePart.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
