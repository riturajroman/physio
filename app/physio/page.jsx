"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const PhysioFetch = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingContact, setEditingContact] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/contact');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setContacts(data);
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setEditedData(contact); // Set edited data to the contact object
    };

    useEffect(() => {
        // Scroll to the edit section if editingContact is not null
        if (editingContact !== null) {
            const editSection = document.getElementById('editSection');
            if (editSection) {
                editSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [editingContact]);

    const handleChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editingContact._id,
                    fullname: editedData.fullname,
                    phone: editedData.phone,
                    email: editedData.email,
                    status: editedData.status,
                    experience: editedData.experience,
                }),
            });
            const data = await response.json();
            console.log(data); // Handle success/failure response
            // Reset state after submission
            setEditingContact(null);
            setEditedData({});
            // Update the contact in the state with the edited data
            const updatedContacts = contacts.map(contact =>
                contact._id === editingContact._id ? { ...contact, ...editedData } : contact
            );
            setContacts(updatedContacts);
            setSearchResults(updatedContacts); // Update search results as well
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filteredContacts = contacts.filter(contact =>
            contact.fullname.toLowerCase().includes(e.target.value.toLowerCase()) ||
            contact.phone.includes(e.target.value)
        );
        setSearchResults(filteredContacts);
    };

    return (
        <div className="container mx-auto p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center mt-3 sm:mt-5">Elderly Form Data</h1>
                <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded'>Registration Form</Link>
            </div>
            <div className="mb-4">
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by name or phone number" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : searchResults.length > 0 ? (
                <div className="rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full mb-4">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 font-semibold bg-gray-200">S.No</th>
                                    <th className="px-2 py-2 font-semibold bg-gray-200">Full Name</th>
                                    <th className="px-2 py-2 font-semibold bg-gray-200">Phone</th>
                                    <th className="px-2 py-2 font-semibold bg-gray-200">Email</th>
                                    <th className="px-2 py-2 font-semibold bg-gray-200">Status</th>
                                    <th className="px-2 py-2 font-semibold bg-gray-200">Experience</th>
                                    <th className="px-2 py-2 font-semibold bg-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((contact, index) => (
                                    <tr key={index}>
                                        <td className="px-2 py-2">{index + 1}</td>
                                        <td className="px-2 py-2">{contact.fullname}</td>
                                        <td className="px-2 py-2">{contact.phone}</td>
                                        <td className="px-2 py-2">{contact.email}</td>
                                        <td className="px-2 py-2">{contact.status}</td>
                                        <td className="px-2 py-2">{contact.experience}</td>
                                        <td className="px-2 py-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={() => handleEdit(contact)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {editingContact && (
                        <div id="editSection" className="border border-gray-400 rounded-lg p-4 bg-gray-200">
                            <div className="flex justify-end">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => setEditingContact(null)}
                                >
                                    Close
                                </button>
                            </div>
                            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                                <label htmlFor="fullname">Full Name:</label>
                                <input type="text" id="fullname" name="fullname" value={editedData.fullname || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" value={editedData.phone || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={editedData.email || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="status">Status:</label>
                                <select id="status" name="status" value={editedData.status || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2">
                                    <option value="Studying">Studying</option>
                                    <option value="Working">Working</option>
                                </select>
                                {editedData.status === 'Working' && (
                                    <>
                                        <label htmlFor="experience">Experience:</label>
                                        <input type="text" id="experience" name="experience" value={editedData.experience || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                    </>
                                )}
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded col-span-2">Save Changes</button>
                            </form>
                        </div>
                    )}

                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default PhysioFetch;

