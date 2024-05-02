import ContactForm from "@/app/form/page";
import Link from "next/link";

export default function Home() {
  return (

    <div className="p-4 bg-slate-100 flex items-center justify-center h-auto w-auto sm:h-screen sm:w-screen">
      <div className="h-auto w-4/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 sm:mr-4">Elderly Registeration Form</h1>
            <p>Please fill in the form below</p>
          </div>
          <Link href="/physio" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>View Physio Details</Link>
        </div>
        <ContactForm />
      </div></div>
  );
}
