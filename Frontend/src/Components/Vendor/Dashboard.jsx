import React, { useState } from 'react';
import { orderData } from '../Listings/sampleData'

const CustomButton = ({ children, onClick, variant = 'primary' }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded ${variant === 'primary'
            ? 'bg-teal-500 text-black hover:bg-teal-600'
            : 'bg-gray-200 text-black hover:bg-gray-300'
            } transition-colors`}
    >
        {children}
    </button>
);

const CustomInput = ({ name, type = 'text', placeholder, value, onChange }) => (
    <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
);

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
                {children}
            </div>
        </div>
    );
};

const InventoryItem = ({ category, itemCount }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-700">
        <div className="flex-1 text-white">{category}</div>
        <div className="flex-1 text-right text-white">{itemCount}</div>
    </div>
);

const UserProfileDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: 'Rebecca Nicholas',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // State for tracking the selected time period
    const [timePeriod, setTimePeriod] = useState('7 days');

    // Extracting relevant data for the selected time period
    const selectedData = orderData[timePeriod];

    const handleInputChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const orderOverviews = {
        "Total Orders": orderData[timePeriod].totalOrders,
        "Delivered Orders": orderData[timePeriod].deliveredOrders,
        "Rejected Orders": orderData[timePeriod].rejectedOrders,
        "Incomplete Orders": orderData[timePeriod].incompleteOrders,
        "Failed Orders": orderData[timePeriod].failedOrders,
    }

    const inventoryCategories = [
        { category: "Packaged Food", itemCount: 150 },
        { category: "Dairy Products", itemCount: 80 },
        { category: "Beverages", itemCount: 200 },
        { category: "Personal Care", itemCount: 120 },
        { category: "Home Essentials", itemCount: 90 },
        { category: "Household Items", itemCount: 110 }
    ];

    return (
        <div className="max-w-7xl mx-auto bg-black/30 text-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b border-b-gray-700 pb-4">
                <div className="">
                    <div className="text-sm text-gray-400">Welcome back,</div>
                    <div className="text-3xl font-bold text-yellow-400">{profileData.fullName}</div>
                    <div className="text-sm text-gray-400">
                        Shop Registration ID: <span>MH54r6e4f54</span>
                    </div>
                </div>
                <CustomButton onClick={() => setIsModalOpen(true)}>Edit profile</CustomButton>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row w-full max-md:space-y-4 md:space-x-8 mt-6">

                {/* Order Overview - now list format */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-400">Order Overview</h2>
                    <div className="bg-gray-800 rounded-lg overflow-hidden p-4 space-y-4">

                        {/* Time Period Selection */}
                        <div className="flex space-x-4 pb-4 border-b border-b-gray-700">
                            {['7 days', '30 days', '1 year', 'All-time'].map((period) => (
                                <button
                                    key={period}
                                    className={`text-gray-200 p-1 hover:text-teal-400 md:w-full bg-gray-900/40 rounded-lg ${timePeriod === period ? 'text-teal-500 font-semibold' : ''
                                        }`}
                                    onClick={() => setTimePeriod(period)}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>

                        {/* Orders List */}
                        <ul className="space-y-4">
                            {
                                ["Total Orders", "Delivered Orders", "Rejected Orders", "Incomplete Orders", "Failed Orders"].map(order => (
                                    <li className="flex justify-between border-b border-b-gray-700 pb-2.5" key={order}>
                                        <span className="text- text-gray-200">{order}</span>
                                        <span className="font-bold text-teal-400">{orderOverviews[order]}</span>
                                    </li>
                                ))
                            }
                        </ul>

                        {/* Total Revenue */}
                        <div className="mt-4 py-2">
                            <p className="text-xl">
                                Total Revenue = <span className=' font-semibold text-yellow-400'>₹{orderData[timePeriod].revenue}</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Divider */}
                <div className='md:border-r max-md:border-b border-gray-700'></div>

                {/* Inventory Overview */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-400">Inventory Overview</h2>
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        {/* Header row */}
                        <div className="flex justify-between items-center py-3 px-4 bg-gray-700 text-gray-300 font-medium">
                            <div className="flex-1">Sub Category</div>
                            <div className="flex-1 text-right">Number of Items</div>
                        </div>
                        {/* Inventory items */}
                        <div className="p-4 space-y-1">
                            {inventoryCategories.map((item, index) => (
                                <InventoryItem key={index} category={item.category} itemCount={item.itemCount} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold text-white mb-4">Edit Profile</h2>
                <div className="space-y-4">
                    <CustomInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={profileData.email}
                        onChange={handleInputChange}
                    />
                    <CustomInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={profileData.password}
                        onChange={handleInputChange}
                    />
                    <CustomInput
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={profileData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-6 flex justify-between space-x-4">
                    <CustomButton variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Back
                    </CustomButton>
                    <CustomButton onClick={() => console.log('Edit profile')}>Edit Profile</CustomButton>
                </div>
            </Modal>
        </div>

    );
};

export default UserProfileDashboard;