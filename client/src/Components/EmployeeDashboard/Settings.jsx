import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Properly initialize useState with an array destructuring
    const [settings, setSettings] = useState({
        userId: user._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value }); // Correctly update state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if newPassword and confirmPassword match
        if (settings.newPassword !== settings.confirmPassword) {
            setError('Passwords do not match');
        } else {
            try {
                const response = await axios.put('http://localhost:5000/api/settings/change-password',
                    settings,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );

                if (response.data.success) {
                    setError('');
                    navigate('/employee-dashboard'); // Redirect after success
                }
            } catch (error) {
                if (error.response && error.response.data && !error.response.data.success) {
                    setError(error.response.data.error);
                } else {
                    setError('An error occurred. Please try again.');
                }
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <p className="text-red-500">{error}</p>
            <form onSubmit={handleSubmit}>
                {/* Old Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Enter Old Password"
                        value={settings.oldPassword}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* New Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Enter New Password"
                        value={settings.newPassword}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={settings.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Settings;
