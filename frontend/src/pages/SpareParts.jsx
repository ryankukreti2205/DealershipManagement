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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {parts.map(part => (
                        <div key={part._id} className="card bg-[#161616] p-6 flex flex-col justify-between border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
                            <div>
                                <h3 className="text-xl font-bold font-heading mb-2 text-white">{part.name}</h3>
                                {part.stock > 0 ? (
                                    <p className="text-sm font-semibold text-green-500 mb-4">In Stock ({part.stock})</p>
                                ) : (
                                    <p className="text-sm font-semibold text-triumph-red mb-4">Out of Stock</p>
                                )}
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-800 border-opacity-50 pt-4 mt-2">
                                <p className="text-triumph-red font-bold text-2xl">₹{part.price?.toLocaleString('en-IN')}</p>
                                <button className={`btn-primary px-4 py-2 text-sm uppercase tracking-wider rounded-md ${part.stock === 0 && 'opacity-50 cursor-not-allowed'}`} disabled={part.stock === 0}>
                                    Buy
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
