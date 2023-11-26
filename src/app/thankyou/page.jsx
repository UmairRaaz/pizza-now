'use client'
import { useRouter } from "next/navigation";

const ThankYouPage = () => {
  const router = useRouter()
  return (
    <div className="min-h-screen flex mt-20  justify-center ">
      <div className="max-w-md p-8 h-[400px] shadow-md rounded-md text-center bg-gray-300">
        <h1 className="text-3xl font-bold text-primary mb-6">Thank You!</h1>
        <p className="text-gray-700 mb-4">
          Your order has been received, and we appreciate your business.
        </p>
        <p className="text-gray-700 mb-6">
          Please note that this is a dummy project for our portfolio, and no actual orders have been placed.
        </p>
        <p className="text-gray-500 text-sm">
          For any inquiries, contact us at <span className="font-semibold">umairgopang123@example.com</span>
        </p>
        <div className="mt-8">
          <div
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-all duration-300 ease-in-out cursor-pointer"
            onClick={()=>router.push('/', )}
          >
            Back to Home
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
