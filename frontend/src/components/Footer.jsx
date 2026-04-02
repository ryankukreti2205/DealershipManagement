import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-gray-900 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-heading font-extrabold tracking-wider text-white mb-4">
                            TRIUMPH<span className="text-triumph-red">.</span>
                        </h2>
                        <p className="text-gray-500 text-sm">
                            For the Ride. Exploring the perfect balance of power, handling and style that makes every Triumph motorcycle completely unique.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Motorcycles</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/bikes" className="hover:text-triumph-red transition-colors">Modern Classics</Link></li>
                            <li><Link to="/bikes" className="hover:text-triumph-red transition-colors">Adventure</Link></li>
                            <li><Link to="/bikes" className="hover:text-triumph-red transition-colors">Roadsters</Link></li>
                            <li><Link to="/bikes" className="hover:text-triumph-red transition-colors">Rocket 3</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="#" className="hover:text-triumph-red transition-colors">Book a Test Ride</Link></li>
                            <li><Link to="/parts" className="hover:text-triumph-red transition-colors">Parts & Accessories</Link></li>
                            <li><Link to="#" className="hover:text-triumph-red transition-colors">Find a Dealer</Link></li>
                            <li><Link to="#" className="hover:text-triumph-red transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Newsletter</h4>
                        <p className="text-gray-500 text-sm mb-4">Subscribe to receive the latest news, updates and offers.</p>
                        <div className="flex">
                            <input type="email" placeholder="Email address" className="bg-triumph-dark border border-gray-800 text-white px-3 py-2 w-full focus:outline-none focus:border-triumph-red rounded-l" />
                            <button className="bg-triumph-red text-white px-4 py-2 rounded-r hover:bg-red-700 transition-colors uppercase font-semibold text-sm tracking-wider">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 text-xs text-center md:text-left">
                        &copy; {new Date().getFullYear()} Triumph Motorcycles Ltd. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-600 uppercase tracking-widest">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
