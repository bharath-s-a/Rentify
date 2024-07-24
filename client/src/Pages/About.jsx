const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">About Our Rentify</h1>
      <p className="text-lg mb-4">
        Welcome to our Rentify website! We are dedicated to helping you find
        your dream home or property. Our team of experienced agents is committed
        to providing exceptional service and guidance throughout your home
        buying or selling journey.
      </p>
      <p className="text-lg mb-4">
        Whether you are a first-time homebuyer, looking to upgrade, or
        interested in investment properties, we have the expertise to assist
        you. With our extensive listings, advanced search tools, and
        personalized assistance, finding the perfect property has never been
        easier.
      </p>
      <p className="text-lg mb-4">
        At our website, we understand that buying or selling a home is a
        significant decision. That is why we strive to make the process as
        smooth and stress-free as possible. From initial consultation to
        closing, we will be by your side every step of the way.
      </p>
      <p className="text-lg mb-8">
        Thank you for choosing our rentify website. We look forward to helping
        you achieve your real estate goals and making your dream home a reality.
      </p>
      <footer className="bg-gray-800 text-white py-4 text-center ">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-2">123 Main Street, City</p>
          <p className="mb-2">Email: rentify@example.com</p>
          <p className="mb-4">Phone: +1234567890</p>
          <div className="flex justify-center">
            <a href="#" className="text-blue-400 hover:text-blue-500 mr-4">
              Twitter
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-500 mr-4">
              Facebook
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-500">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
