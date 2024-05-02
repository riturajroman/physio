import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req) {
  const { fullname, phone, email, status, experience } = await req.json();

  try {
    await connectDB();

    const existingContact = await Contact.findOne({ phone });

    if (existingContact) {
      return NextResponse.json({ msg: ["Phone number must be unique."] });
    }

    // Set default experience to 0 if status is "Studying"
    const defaultExperience = status === "Studying" ? 0 : experience;

    await Contact.create({
      fullname,
      phone,
      email,
      status,
      experience: defaultExperience,
    });

    return NextResponse.json({
      msg: ["Saved successfully"],
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

export async function PUT(req) {
  const { id, fullname, phone, email, status, experience } = await req.json();

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
    existingContact.status = status;
    existingContact.experience = experience;

    await existingContact.save();

    return NextResponse.json({
      msg: ["Contact updated successfully"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to update contact."] });
  }
}
