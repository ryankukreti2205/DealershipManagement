import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [parts, setParts] = useState([]);
    const [activeTab, setActiveTab] = useState('bookings');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Bike Form States
    const [showBikeForm, setShowBikeForm] = useState(false);
    const [currentBikeId, setCurrentBikeId] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [engine, setEngine] = useState('');
    const [power, setPower] = useState('');
    const [torque, setTorque] = useState('');
    const [weight, setWeight] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'Admin') {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            try {
                const [bData, bikesData, partsData] = await Promise.all([
                    axios.get('/api/bookings', config),
                    axios.get('/api/bikes'),
                    axios.get('/api/parts')
                ]);
                setBookings(bData.data);
                setBikes(bikesData.data);
                setParts(partsData.data);
            } catch (error) {
                console.error(error);
                toast.error('Error fetching admin data');
            }
        };

        fetchData();
    }, [navigate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
            toast.success('Image Uploaded!');
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
    };

    const createOrUpdateBike = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const bikeData = {
            name,
            price: Number(price),
            image,
            specs: { engine, power, torque, weight }
        };

        try {
            if (currentBikeId) {
                await axios.put(`/api/bikes/${currentBikeId}`, bikeData, config);
                toast.success('Bike updated');
            } else {
                await axios.post('/api/bikes', bikeData, config);
                toast.success('Bike created');
            }
            setShowBikeForm(false);
            const { data } = await axios.get('/api/bikes');
            setBikes(data);
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const deleteBikeHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this motorcycle?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`/api/bikes/${id}`, config);
                toast.success('Bike deleted');
                const { data } = await axios.get('/api/bikes');
                setBikes(data);
            } catch (error) {
                toast.error('Deletion failed');
            }
        }
    };

    const openEditForm = (bike) => {
        setCurrentBikeId(bike._id);
        setName(bike.name);
        setPrice(bike.price);
        setImage(bike.image);
        setEngine(bike.specs?.engine || '');
        setPower(bike.specs?.power || '');
        setTorque(bike.specs?.torque || '');
        setWeight(bike.specs?.weight || '');
        setShowBikeForm(true);
    };

    const openCreateForm = () => {
        setCurrentBikeId(null);
        setName('');
        setPrice(0);
        setImage('');
        setEngine('');
        setPower('');
        setTorque('');
        setWeight('');
        setShowBikeForm(true);
    };

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-200px)]">
            <h1 className="text-4xl font-heading font-extrabold uppercase tracking-wider mb-8 border-b border-gray-800 pb-4">
                Admin <span className="text-triumph-red">Dashboard</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-xl">
                    <h3 className="text-gray-400 font-heading tracking-widest text-sm uppercase">Total Bookings</h3>
                    <p className="text-3xl font-bold mt-2 text-white">{bookings.length}</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-xl">
                    <h3 className="text-gray-400 font-heading tracking-widest text-sm uppercase">Motorcycles</h3>
                    <p className="text-3xl font-bold mt-2 text-white">{bikes.length}</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-xl">
                    <h3 className="text-gray-400 font-heading tracking-widest text-sm uppercase">Spare Parts</h3>
                    <p className="text-3xl font-bold mt-2 text-white">{parts.length}</p>
                </div>
            </div>

            <div className="flex border-b border-gray-800 mb-8 space-x-8">
                <button
                    className={`pb-4 uppercase tracking-widest font-semibold transition-colors ${activeTab === 'bookings' ? 'text-triumph-red border-b-2 border-triumph-red' : 'text-gray-500 hover:text-white'}`}
                    onClick={() => { setActiveTab('bookings'); setShowBikeForm(false); }}
                >
                    Test Rides
                </button>
                <button
                    className={`pb-4 uppercase tracking-widest font-semibold transition-colors ${activeTab === 'bikes' ? 'text-triumph-red border-b-2 border-triumph-red' : 'text-gray-500 hover:text-white'}`}
                    onClick={() => setActiveTab('bikes')}
                >
                    Motorcycles
                </button>
                <button
                    className={`pb-4 uppercase tracking-widest font-semibold transition-colors ${activeTab === 'parts' ? 'text-triumph-red border-b-2 border-triumph-red' : 'text-gray-500 hover:text-white'}`}
                    onClick={() => { setActiveTab('parts'); setShowBikeForm(false); }}
                >
                    Spare Parts
                </button>
            </div>

            <div className="bg-[#161616] p-6 rounded-xl border border-gray-800 overflow-x-auto min-h-[400px]">
                {activeTab === 'bookings' && (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 font-heading tracking-widest uppercase border-b border-gray-800">
                                <th className="pb-4">Name</th>
                                <th className="pb-4">Phone</th>
                                <th className="pb-4">Bike</th>
                                <th className="pb-4">Date</th>
                                <th className="pb-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b._id} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition-colors">
                                    <td className="py-4">{b.name}</td>
                                    <td className="py-4">{b.phone}</td>
                                    <td className="py-4 text-triumph-red">{b.bike?.name || 'Unknown'}</td>
                                    <td className="py-4">{new Date(b.date).toLocaleDateString()}</td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 rounded bg-yellow-900 bg-opacity-30 text-yellow-500 text-xs uppercase tracking-wider">
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && <tr><td colSpan="5" className="text-center py-8 text-gray-500">No bookings found.</td></tr>}
                        </tbody>
                    </table>
                )}

                {activeTab === 'bikes' && (
                    <div>
                        {!showBikeForm ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold font-heading uppercase">Manage Motorcycles</h2>
                                    <button onClick={openCreateForm} className="btn-primary py-2 px-4 text-sm">+ Add New Motorcycle</button>
                                </div>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-gray-400 font-heading tracking-widest uppercase border-b border-gray-800">
                                            <th className="pb-4">Image</th>
                                            <th className="pb-4">Name</th>
                                            <th className="pb-4">Price</th>
                                            <th className="pb-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bikes.map(bike => (
                                            <tr key={bike._id} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition-colors">
                                                <td className="py-4"><img src={bike.image} alt={bike.name} className="w-16 h-10 object-cover rounded" /></td>
                                                <td className="py-4 font-semibold">{bike.name}</td>
                                                <td className="py-4">₹{bike.price?.toLocaleString('en-IN')}</td>
                                                <td className="py-4 flex gap-4">
                                                    <button onClick={() => openEditForm(bike)} className="text-blue-400 hover:text-blue-300">Edit</button>
                                                    <button onClick={() => deleteBikeHandler(bike._id)} className="text-red-500 hover:text-red-400">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold font-heading uppercase">{currentBikeId ? 'Edit Motorcycle' : 'Create Motorcycle'}</h2>
                                    <button onClick={() => setShowBikeForm(false)} className="text-gray-400 hover:text-white">Cancel</button>
                                </div>
                                <form onSubmit={createOrUpdateBike} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1a1a1a] p-6 rounded border border-gray-800">
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">Bike Name</label>
                                        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">Price (INR)</label>
                                        <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">Image Form</label>
                                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL" className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white mb-2" />
                                        <input type="file" id="image-file" label="Choose File" onClick={(e) => { e.target.value = null }} onChange={uploadFileHandler} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600" />
                                        {uploading && <p className="text-xs text-triumph-red mt-2">Uploading...</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">Engine Details</label>
                                        <input type="text" value={engine} onChange={(e) => setEngine(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">Power</label>
                                        <input type="text" value={power} onChange={(e) => setPower(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">Torque</label>
                                        <input type="text" value={torque} onChange={(e) => setTorque(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">Weight</label>
                                        <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white" />
                                    </div>
                                    <div className="md:col-span-2 pt-4">
                                        <button type="submit" className="btn-primary px-8 py-3 w-full">{currentBikeId ? 'Update Motorcycle' : 'Create Motorcycle'}</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'parts' && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="mb-4 text-xl">Spare Parts Management</p>
                        <p className="text-sm uppercase tracking-widest text-gray-600 mb-6">(CRUD implementation placeholder for concise UI)</p>
                        <button className="btn-primary">Add New Part</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
