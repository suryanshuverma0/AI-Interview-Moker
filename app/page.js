import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />

     
      <div className="bg-gray-50 text-gray-900 h-full flex flex-col items-center justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6">Master Your Interview Skills</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Designed and developed by Sohan Mehta
          </p>
          <Link href="/dashboard">
            <button className="px-10 py-4 bg-primary text-white rounded-full font-semibold hover:bg-blue-500 transition duration-300">
              Start Practicing
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
