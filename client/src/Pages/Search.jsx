import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    all: false,
    rent: false,
    sale: false,
    offer: false,
    parking: false,
    furnished: false,
    sort_order: "Price high to low",
  });

  const fetchListings = async () => {
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,
        all: filters.all,
        rent: filters.rent,
        sale: filters.sale,
        offer: filters.offer,
        parking: filters.parking,
        furnished: filters.furnished,
        sort_order: filters.sort_order,
      });

      const response = await fetch(
        `http://localhost:3001/listings?${queryParams.toString()}`
      );
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFilters({
      ...filters,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchListings();
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/like-listing/${id}`, {
        method: "POST",
      });

      if (response.ok) {
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing.id === id
              ? { ...listing, like_count: listing.like_count + 1 }
              : listing
          )
        );
      } else {
        throw new Error("Failed to like the listing");
      }
    } catch (error) {
      console.error("Error liking the listing:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-3 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchterm"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="all"
                checked={filters.all}
                onChange={handleFilterChange}
                className="w-5 h-5"
              />
              <span>Rent & sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                checked={filters.rent}
                onChange={handleFilterChange}
                className="w-5 h-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sale"
                checked={filters.sale}
                onChange={handleFilterChange}
                className="w-5 h-5"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                checked={filters.offer}
                onChange={handleFilterChange}
                className="w-5 h-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Amenities:
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                checked={filters.parking}
                onChange={handleFilterChange}
                className="w-5 h-5"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                checked={filters.furnished}
                onChange={handleFilterChange}
                className="w-5 h-5"
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              className="border rounded-lg p-3 focus:outline-none focus:ring focus:border-blue-300"
              id="sort_order"
              value={filters.sort_order}
              onChange={handleFilterChange}
            >
              <option value="Price high to low">Price high to low</option>
              <option value="Price low to high">Price low to high</option>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-80 focus:outline-none focus:ring focus:border-blue-300">
            Search
          </button>
          <div></div>
        </form>
      </div>

      <div className="flex-1 p-3">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="p-4 border rounded-lg shadow-lg hover:text-slate-900 hover:shadow-xl transition duration-300 ease-in-out border-slate-400"
            >
              <Link to={`/listing/${listing.name}`}>
                <h2 className="text-xl font-bold">{listing.name}</h2>
                <p>{listing.description}</p>
                <p className="font-bold">Price: ${listing.regular_price}</p>
                {listing.discounted_price && (
                  <p className="font-bold">
                    Discounted Price: ${listing.discounted_price}
                  </p>
                )}

                <button className="text-gray-400 py-2">Interested</button>
              </Link>
              <div>
                {" "}
                <button
                  onClick={() => handleLike(listing.id)}
                  className="py-2 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
                >
                  {listing.like_count} Likes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
