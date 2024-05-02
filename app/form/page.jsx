"use client";

import { useState } from "react";

export default function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("Studying"); // Dropdown default value
    const [experience, setExperience] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Full name: ", fullname);
        console.log("Phone: ", phone);
        console.log("Email: ", email);
        console.log("Status: ", status);
        console.log("Experience: ", experience);

        const res = await fetch("api/contact", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                fullname,
                phone,
                email,
                status,
                experience,
            }),
        });

        const { msg, success } = await res.json();
        setError(msg);
        setSuccess(success);
        setLoading(false);

        if (success) {
            setFullname("");
            setPhone("");
            setEmail("");
            setStatus("Studying");
            setExperience("");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="py-4 mt-4 border-t gap-5 grid grid-cols-1 sm:grid-cols-2"
            >
                <div>
                    <label htmlFor="fullname">Full Name*</label>
                    <input
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        type="text"
                        id="fullname"
                        placeholder="John Doe"
                        required
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="phone">Phone # / Whats up #*</label>
                    <input
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        type="text"
                        id="phone"
                        placeholder="Phone number"
                        required
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="email">Email*</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        placeholder="john@gmail.com"
                        required
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="status">Select*</label>
                    <select
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        id="status"
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        required
                    >
                        <option value="Studying">Studying</option>
                        <option value="Working">Working</option>
                    </select>
                </div>

                {status === "Working" && (
                    <div>
                        <label htmlFor="experience">Experience (optional)</label>
                        <input
                            onChange={(e) => setExperience(e.target.value)}
                            value={experience}
                            type="text"
                            id="experience"
                            placeholder="Experience in years"
                            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        />
                    </div>
                )}

                <button className="bg-green-700 p-3 text-white font-bold hover:bg-green-900" type="submit" disabled={loading}>
                    {loading ? "Submiting..." : "Submit"}
                </button>

            </form>

            {loading && <div className="loader">Loading...</div>}

            <div className="bg-slate-100 flex flex-col">
                {error &&
                    error.map((e, index) => (
                        <div key={index} className={`${success ? "text-green-800" : "text-red-600"} px-5 py-2`}>
                            {e}
                        </div>
                    ))}
            </div>
        </>
    );
}