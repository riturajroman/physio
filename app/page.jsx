import ContactForm from "@/app/form/page";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 bg-slate-100 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Physio Registeration Form</h1>
          <p>Please fill in the form below</p>
        </div>
        <Link href="/physio" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>View Physio Details</Link>
      </div>
      <ContactForm />
    </div>
  );
}
