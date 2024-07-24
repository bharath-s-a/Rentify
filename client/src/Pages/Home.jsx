import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-100 flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover a wide range of properties tailored to your needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Search Properties
              </h2>
              <p className="text-gray-600">
                Explore our listings to find the perfect property for you.
              </p>
              <Link to="/search">
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Buy Property
                </button>
              </Link>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Sell Your Home
              </h2>
              <p className="text-gray-600">
                List your property with us and reach potential buyers.
              </p>
              <Link to="/create-listing">
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                  Sell property
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Why Choose our Rentify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Our team of experts are here to help you through every step of
                the buying and selling process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Comprehensive Listings
              </h3>
              <p className="text-gray-600">
                We offer a wide range of properties to suit all budgets and
                preferences.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600">
                Our goal is to ensure every client is completely satisfied with
                our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Rentify made buying our first home an amazing experience. We
                could not have asked for better service!
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Selling our property was quick and easy with Rentify. Highly
                recommend!
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className=" text-black py-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to Our Rentify Website
          </h2>
          <p className="text-lg mb-4">
            Owning a home is a keystone of wealth both financial affluence and
            emotional security.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p className="mb-2">XYZ Main Street, Chennai</p>
              <p className="mb-2">Email: rentify@example.com</p>
              <p>Phone: +1245678910</p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
