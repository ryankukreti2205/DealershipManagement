import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpareParts = () => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const { data } = await axios.get('/api/parts');
                setParts(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchParts();
    }, []);

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-heading font-extrabold uppercase tracking-wider mb-2 border-b-2 border-triumph-red inline-block pb-2">
                Accessories & Parts
            </h1>
            <p className="text-gray-400 max-w-2xl mt-4 mb-12">
                Genuine Triumph Accessories and Parts designed specifically for your motorcycle. Built to the same high standards as your bike.
            </p>

            {loading ? (
                <div className="text-center py-20"><p className="text-2xl text-gray-500 uppercase tracking-widest font-heading">Loading inventory...</p></div>
            ) : parts.length === 0 ? (
                <div className="text-center py-20"><p className="text-2xl text-gray-500 uppercase tracking-widest">No parts available currently.</p></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {parts.map(part => (
                        <div key={part._id} className="card group bg-[#161616] p-4 flex flex-col justify-between">
                            <div>
                                <div className="h-48 overflow-hidden rounded mb-4 bg-[#111]">
                                    {part.image ? (
                                        <img src={part.image} alt={part.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 font-heading">No Image</div>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold font-heading mb-2 text-white">{part.name}</h3>
                                {part.stock > 0 ? (
                                    <p className="text-sm text-green-500 mb-2">In Stock ({part.stock})</p>
                                ) : (
                                    <p className="text-sm text-triumph-red mb-2">Out of Stock</p>
                                )}
                            </div>
                            <div className="flex justify-between items-center mt-4 border-t border-gray-800 pt-4">
                                <p className="text-triumph-red font-bold text-xl">₹{part.price?.toLocaleString('en-IN')}</p>
                                <button className={`btn-primary px-4 py-2 text-sm ${part.stock === 0 && 'opacity-50 cursor-not-allowed'}`} disabled={part.stock === 0}>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SpareParts;
