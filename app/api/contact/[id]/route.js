import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";

export async function PUT(request, { params }) {
    try {
        // Extract contact ID from request parameters
        const { id } = params;

        // Ensure request body is not empty
        if (!request.body) {
            return NextResponse.json({ msg: ["Request body is empty."], status: "error", all: null });
        }

        // Extract contact details from request body
        const { fullname, phone, email, gender, age, degree, designation, organization, experience, elderly, targets } = await request.json();

        // Validate required fields
        if (!fullname || !phone || !email) {
            return NextResponse.json({ msg: ["Fullname, phone, and email are required fields."], status: "error", all: null });
        }

        // Connect to the database
        await connectDB();

        // Find the contact by ID
        const contact = await Contact.findById(id);

        // Check if contact exists
        if (!contact) {
            return NextResponse.json({ msg: ["Contact not found."], status: "error", all: null });
        }

        // Update contact details
        contact.fullname = fullname;
        contact.phone = phone;
        contact.email = email;
        contact.gender = gender;
        contact.age = age;
        contact.degree = degree;
        contact.designation = designation;
        contact.organization = organization;
        contact.experience = experience;
        contact.elderly = elderly;
        contact.targets = targets;

        // Save the updated contact
        await contact.save();

        return NextResponse.json({ msg: ["Contact updated successfully."], status: "success", all: contact });
    } catch (error) {
        // Log error for debugging
        console.error("Error updating contact:", error);
        return NextResponse.json({ msg: ["Unable to update contact."], status: "error", all: null });
    }
}