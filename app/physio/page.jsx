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
                    ...editedData,
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

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/contact');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    return (
        <div className="container mx-auto p-5">
            <div className="flex items-center justify-between">
                <h1 className="text-5xl font-semibold mb-8 text-center mt-5">Physio Form Data</h1>
                <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Registration Form</Link>
            </div>
            <div className="mb-4">
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by name or phone number" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-2 gap-8">
                    {searchResults.map((contact, index) => (
                        <div key={index} className="rounded-lg">
                            <table className="w-full mb-4">
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Full Name:</td>
                                        <td className="px-4 py-2">{contact.fullname}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Phone:</td>
                                        <td className="px-4 py-2">{contact.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Email:</td>
                                        <td className="px-4 py-2">{contact.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Gender:</td>
                                        <td className="px-4 py-2">{contact.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Age:</td>
                                        <td className="px-4 py-2">{contact.age}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Degree:</td>
                                        <td className="px-4 py-2">{contact.degree}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Designation:</td>
                                        <td className="px-4 py-2">{contact.designation}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Organization:</td>
                                        <td className="px-4 py-2">{contact.organization}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Experience:</td>
                                        <td className="px-4 py-2">{contact.experience}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Elderly:</td>
                                        <td className="px-4 py-2">{contact.elderly}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Targets:</td>
                                        <td className="px-4 py-2">{contact.targets}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(contact)}>Edit</button>
                        </div>
                    ))}
                    {editingContact && (
                        <div id="editSection" className="border border-gray-400 rounded-lg p-4 bg-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                                <label htmlFor="fullname">Full Name:</label>
                                <input type="text" id="fullname" name="fullname" value={editedData.fullname || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" value={editedData.phone || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={editedData.email || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="gender">Gender:</label>
                                <input type="text" id="gender" name="gender" value={editedData.gender || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="age">Age:</label>
                                <input type="text" id="age" name="age" value={editedData.age || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="degree">Degree:</label>
                                <input type="text" id="degree" name="degree" value={editedData.degree || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="designation">Designation:</label>
                                <input type="text" id="designation" name="designation" value={editedData.designation || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="organization">Organization:</label>
                                <input type="text" id="organization" name="organization" value={editedData.organization || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="experience">Experience:</label>
                                <input type="text" id="experience" name="experience" value={editedData.experience || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="elderly">Elderly:</label>
                                <input type="text" id="elderly" name="elderly" value={editedData.elderly || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <label htmlFor="targets">Targets:</label>
                                <input type="text" id="targets" name="targets" value={editedData.targets || ''} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2">Save Changes</button>
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