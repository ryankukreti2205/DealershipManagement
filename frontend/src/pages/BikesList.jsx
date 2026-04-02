import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search } from 'lucide-react';

const BikesList = () => {
    const [bikes, setBikes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const { data } = await axios.get('/api/bikes');
                setBikes(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchBikes();
    }, []);

    const filteredBikes = bikes.filter(bike =>
        bike.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <h1 className="text-4xl font-heading font-extrabold uppercase tracking-wider mb-6 md:mb-0">
                    Our Motorcycles
                </h1>
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search models..."
                        className="input-field pl-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20"><p className="text-2xl text-gray-500 uppercase tracking-widest font-heading">Loading...</p></div>
            ) : filteredBikes.length === 0 ? (
                <div className="text-center py-20"><p className="text-2xl text-gray-500 uppercase tracking-widest">No motorcycles found.</p></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredBikes.map(bike => (
                        <div key={bike._id} className="card group cursor-pointer block border border-gray-800 bg-[#161616]">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={bike.image}
                                    alt={bike.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold font-heading mb-2">{bike.name}</h3>
                                <div className="text-sm text-gray-400 mb-4 space-y-1">
                                    <p><span className="font-semibold text-gray-300">Engine:</span> {bike.specs?.engine}</p>
                                    <p><span className="font-semibold text-gray-300">Power:</span> {bike.specs?.power}</p>
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    <p className="text-triumph-red font-semibold text-xl">₹{bike.price?.toLocaleString('en-IN')}</p>
                                    <Link to={`/bikes/${bike._id}`} className="btn-outline text-xs px-4 py-1.5 uppercase tracking-wider">
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BikesList;
