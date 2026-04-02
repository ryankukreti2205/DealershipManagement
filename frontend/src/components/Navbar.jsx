import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Basic auth check logic (will enhance later)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <nav className="bg-[#0a0a0a] border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-3xl font-heading font-extrabold tracking-wider text-triumph-text">
                            TRIUMPH<span className="text-triumph-red">.</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/bikes" className="text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold">
                            Motorcycles
                        </Link>
                        <Link to="/parts" className="text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold">
                            Accessories & Parts
                        </Link>

                        {userInfo ? (
                            <div className="flex items-center space-x-4">
                                {userInfo.role === 'Admin' && (
                                    <Link to="/admin" className="text-triumph-red hover:text-red-400 font-semibold text-sm tracking-wide">
                                        DASHBOARD
                                    </Link>
                                )}
                                <button onClick={logoutHandler} className="text-gray-300 hover:text-white flex items-center gap-2">
                                    <User size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-outline text-sm">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#121212] border-b border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        <Link to="/bikes" className="block px-3 py-2 text-gray-300 hover:text-white text-base font-medium uppercase tracking-widest">
                            Motorcycles
                        </Link>
                        <Link to="/parts" className="block px-3 py-2 text-gray-300 hover:text-white text-base font-medium uppercase tracking-widest">
                            Accessories
                        </Link>
                        {userInfo ? (
                            <>
                                {userInfo.role === 'Admin' && (
                                    <Link to="/admin" className="block px-3 py-2 text-triumph-red font-medium tracking-wide">
                                        Dashboard
                                    </Link>
                                )}
                                <button onClick={logoutHandler} className="block px-3 py-2 text-gray-300 hover:text-white text-base font-medium">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 text-triumph-red font-semibold uppercase">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
