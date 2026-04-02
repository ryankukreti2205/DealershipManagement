import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [featuredBikes, setFeaturedBikes] = useState([]);

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const { data } = await axios.get('/api/bikes');
                setFeaturedBikes(data.slice(0, 3)); // display top 3
            } catch (error) {
                console.error(error);
            }
        };
        fetchBikes();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558981420-410e30349f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white uppercase tracking-widest mb-6 animate-fade-in-up">
                        For The Ride
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
                        Experience the perfect balance of power, handling, and style with our latest collection of premium motorcycles.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/bikes" className="btn-primary text-lg px-8 py-4 uppercase tracking-widest">
                            View Motorcycles
                        </Link>
                        <Link to="/parts" className="btn-outline text-lg px-8 py-4 uppercase tracking-widest bg-black bg-opacity-40">
                            Shop Accessories
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Bikes Showcase */}
            <div className="py-24 bg-[#121212]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold text-white uppercase tracking-wider mb-4 border-b-2 border-triumph-red inline-block pb-2">
                            Featured Collection
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Discover our most popular models, engineered for unmatched performance and breath-taking excitement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredBikes.map(bike => (
                            <div key={bike._id} className="card group cursor-pointer block">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={bike.image}
                                        alt={bike.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold font-heading text-white mb-2">{bike.name}</h3>
                                    <p className="text-triumph-red font-semibold text-lg mb-4">₹{bike.price.toLocaleString('en-IN')}</p>
                                    <Link to={`/bikes/${bike._id}`} className="text-sm uppercase tracking-widest font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                        Explore Details <span className="text-triumph-red">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/bikes" className="inline-block btn-outline uppercase tracking-widest">
                            View All Models
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
