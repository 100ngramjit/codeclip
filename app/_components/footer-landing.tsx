import { Mail, MapPinned, PhoneCall } from "lucide-react";

const FooterLanding = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Have a question or feedback? Reach out to us!
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center p-6 rounded-lg">
          <Mail className="h-12 w-12  mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-center mb-4">Drop us an email</p>
          <p className="">100ngramjit@gmail.com</p>
        </div>
        <div className="flex flex-col items-center p-6 rounded-lg">
          <PhoneCall className="h-12 w-12  mb-4" />
          <h3 className="text-xl font-semibold mb-2">Phone</h3>
          <p className="text-center mb-4">Give us a call</p>
          <p className="">+91-9101088439</p>
        </div>
        <div className="flex flex-col items-center p-6 rounded-lg">
          <MapPinned className="h-12 w-12  mb-4" />
          <h3 className="text-xl font-semibold mb-2">Office</h3>
          <p className="text-center mb-4">Stay connected with us!</p>
          <p className="">Coming Soon!</p>
        </div>
      </div>
    </div>
  );
};

export default FooterLanding;
