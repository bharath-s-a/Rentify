import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:3001/listings/${name}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Listing data:", data);
          setListing(data);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch listing details");
        }
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListing();
  }, [name]);

  console.log("Listing name:", name);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>{listing.name}</h1>
      <p>Description: {listing.description}</p>
      <p>Address: {listing.address}</p>
      <p>Price: ${listing.regular_price}</p>
      {listing.discounted_price && (
        <p>Discounted Price: ${listing.discounted_price}</p>
      )}
    </div>
  );
};

export default PropertyDetails;
