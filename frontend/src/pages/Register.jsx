import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/auth/register', { name, email, password }, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Registration successful!');

            window.location.href = '/';
        } catch (error) {
            toast.error(error.response && error.response.data.message
                ? error.response.data.message
                : error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-250px)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-triumph-gray p-10 rounded-xl shadow-2xl border border-gray-800">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white font-heading uppercase tracking-wider">
                        Create an Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    <div className="rounded-md space-y-4 shadow-sm">
                        <div>
                            <label className="sr-only">Full Name</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="sr-only">Email address</label>
                            <input
                                type="email"
                                required
                                className="input-field"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="sr-only">Password</label>
                            <input
                                type="password"
                                required
                                className="input-field"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full btn-primary uppercase tracking-widest">
                            Register
                        </button>
                    </div>
                    <div className="text-sm text-center text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-triumph-red hover:text-red-400 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
