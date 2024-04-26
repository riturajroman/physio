"use client";

import { useState } from "react";

export default function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [degree, setDegree] = useState("");
    const [designation, setDesignation] = useState("");
    const [organization, setOrganization] = useState("");
    const [experience, setExperience] = useState("");
    const [elderly, setElderly] = useState("");
    const [targets, setTargets] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Full name: ", fullname);
        console.log("Phone: ", phone);
        console.log("Email: ", email);
        console.log("Gender: ", gender);
        console.log("Age: ", age);
        console.log("Degree: ", degree);
        console.log("Designation: ", designation);
        console.log("Organization: ", organization);
        console.log("Experience: ", experience);
        console.log("Elderly: ", elderly);
        console.log("Targets: ", targets);

        const res = await fetch("api/contact", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                fullname,
                phone,
                email,
                gender,
                age,
                degree,
                designation,
                organization,
                experience,
                elderly,
                targets,
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
            setGender("");
            setAge("");
            setDegree("");
            setDesignation("");
            setOrganization("");
            setExperience("");
            setElderly("");
            setTargets("");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="py-4 mt-4 border-t gap-5 grid grid-cols-2"
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
                    />
                </div>

                <div>
                    <label htmlFor="gender">Gender*</label>
                    <input
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        type="text"
                        id="gender"
                        placeholder="Gender"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="age">Age*</label>
                    <input
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        type="number"
                        id="age"
                        placeholder="Age"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="degree">Education Degree*</label>
                    <input
                        onChange={(e) => setDegree(e.target.value)}
                        value={degree}
                        type="text"
                        id="degree"
                        placeholder="Education Degree"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="designation">Current Designation*</label>
                    <input
                        onChange={(e) => setDesignation(e.target.value)}
                        value={designation}
                        type="text"
                        id="designation"
                        placeholder="Current Designation"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="organization">Current Organization & Address*</label>
                    <input
                        onChange={(e) => setOrganization(e.target.value)}
                        value={organization}
                        type="text"
                        id="organization"
                        placeholder="Current Organization & Address"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="experience">Total Experience*</label>
                    <input
                        onChange={(e) => setExperience(e.target.value)}
                        value={experience}
                        type="text"
                        id="experience"
                        placeholder="Total Experience"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="elderly">Willing work with Elderly ?*</label>
                    <input
                        onChange={(e) => setElderly(e.target.value)}
                        value={elderly}
                        type="text"
                        id="elderly"
                        placeholder="Yes/No"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="targets">Monthly targets?*</label>
                    <input
                        onChange={(e) => setTargets(e.target.value)}
                        value={targets}
                        type="text"
                        id="targets"
                        placeholder="Monthly targets"
                        required
                    />
                </div>

                <button className="bg-green-700 p-3 text-white font-bold" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
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