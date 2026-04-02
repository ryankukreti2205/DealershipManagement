import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const BikeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Booking form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }

        const fetchBike = async () => {
            try {
                const { data } = await axios.get(`/api/bikes/${id}`);
                setBike(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchBike();
    }, [id]);

    const submitBooking = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            // Optional: attach token if user logged in
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                config.headers.Authorization = `Bearer ${userInfo.token}`;
            }

            await axios.post('/api/bookings', {
                bike: bike._id,
                name,
                email,
                phone,
                date
            }, config);

            toast.success('Test Ride Booked Successfully!');
            setShowModal(false);
        } catch (error) {
            toast.error(error.response && error.response.data.message
                ? error.response.data.message
                : error.message);
        }
    };

    if (loading) return <div className="text-center py-40"><h2 className="text-3xl font-heading font-extrabold uppercase tracking-widest text-gray-500">Loading...</h2></div>;
    if (!bike) return <div className="text-center py-40 text-red-500 font-heading text-2xl">Bike Not Found</div>;

    return (
        <div className="pb-16 relative">
            {/* Hero Image */}
            <div className="w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${bike.image})` }}>
                <div className="w-full h-full bg-gradient-to-t from-[#121212] via-transparent to-transparent flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-wider">{bike.name}</h1>
                        <p className="text-3xl font-semibold text-triumph-red mt-4">₹{bike.price?.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>

            {/* Content Range */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold font-heading uppercase tracking-widest border-b border-gray-800 pb-4 mb-6">Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-800">
                            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Engine</h4>
                            <p className="font-semibold text-lg">{bike.specs?.engine}</p>
                        </div>
                        <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-800">
                            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Power</h4>
                            <p className="font-semibold text-lg">{bike.specs?.power}</p>
                        </div>
                        <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-800">
                            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Torque</h4>
                            <p className="font-semibold text-lg">{bike.specs?.torque}</p>
                        </div>
                        <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-800">
                            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Weight</h4>
                            <p className="font-semibold text-lg">{bike.specs?.weight}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-[#161616] p-8 rounded-xl border border-gray-800 sticky top-28 shadow-2xl">
                        <h3 className="text-2xl font-heading font-bold mb-6 text-white text-center uppercase">Experience It</h3>
                        <p className="text-gray-400 text-center mb-8 text-sm">
                            Feel the power and agility for yourself. Book a test ride at your local dealership today.
                        </p>
                        <button onClick={() => setShowModal(true)} className="w-full btn-primary text-lg tracking-widest py-4">
                            Book Test Ride
                        </button>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4">
                    <div className="bg-[#1a1a1a] rounded-xl max-w-lg w-full p-8 border border-gray-700 shadow-2xl relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            &times; Close
                        </button>
                        <h3 className="text-3xl font-heading font-bold mb-6 uppercase tracking-wider text-center border-b border-gray-800 pb-4">
                            Book Test Ride
                        </h3>
                        <p className="text-triumph-red font-semibold mb-6 text-center text-lg">{bike.name}</p>

                        <form onSubmit={submitBooking} className="space-y-4">
                            <input type="text" placeholder="Full Name" required className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" placeholder="Email Address" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="tel" placeholder="Phone Number" required className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input type="date" required className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />

                            <button type="submit" className="w-full btn-primary mt-6 tracking-widest text-lg">
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BikeDetails;
