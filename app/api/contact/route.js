import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req) {
  const { fullname, phone, email, gender, age, degree, designation, organization, experience, elderly, targets } = await req.json();

  try {
    await connectDB();

    const existingContact = await Contact.findOne({ phone });

    if (existingContact) {
      return NextResponse.json({ msg: ["Phone number must be unique."] });
    }

    await Contact.create({ fullname, phone, email, gender, age, degree, designation, organization, experience, elderly, targets });

    // Call nodemailer function on successful submission
    await sendEmail(fullname, email, {
      phone,
      gender,
      age,
      degree,
      designation,
      organization,
      experience,
      elderly,
      targets,
    });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to send message."] });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const contacts = await Contact.find();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to fetch contacts."] });
  }
}

async function sendEmail(fullname, email, formData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "elderlywellness2024@gmail.com",
      pass: "45rtfgyrrt",
    },
  });

  // Construct the email body with all the form data
  const emailBody = `
    Dear ${fullname},
    
    Your message has been received successfully. Below are the details you provided:
    
    Full Name: ${fullname}
    Email: ${email}
    Phone: ${formData.phone}
    Gender: ${formData.gender}
    Age: ${formData.age}
    Degree: ${formData.degree}
    Designation: ${formData.designation}
    Organization: ${formData.organization}
    Experience: ${formData.experience}
    Elderly: ${formData.elderly}
    Targets: ${formData.targets}
    
    We will get back to you shortly.
    
    Regards,
    The Team
  `;

  const mailOptions = {
    from: "elderlywellness2024@gmail.com",
    to: "elderlywellness2024@gmail.com", // Send email to the provided email address
    subject: "Message sent successfully",
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function PUT(req) {
  const { id, fullname, phone, email, gender, age, degree, designation, organization, experience, elderly, targets } = await req.json();

  try {
    await connectDB();

    // Find the contact by ID
    const existingContact = await Contact.findById(id);

    if (!existingContact) {
      return NextResponse.json({ msg: ["Contact not found."] });
    }

    // Update the contact with new data
    existingContact.fullname = fullname;
    existingContact.phone = phone;
    existingContact.email = email;
    existingContact.gender = gender;
    existingContact.age = age;
    existingContact.degree = degree;
    existingContact.designation = designation;
    existingContact.organization = organization;
    existingContact.experience = experience;
    existingContact.elderly = elderly;
    existingContact.targets = targets;

    await existingContact.save();

    return NextResponse.json({
      msg: ["Contact updated successfully"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to update contact."] });
  }
}