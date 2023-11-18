import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BookingForm({ currentUser, listing }) {
  //   const { currentUser } = useSelector((state) => state.user);
  const price  = listing.rentalPrice 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    listingRef: "",
    agencygRef: "",
    customer: "",
    Dl: "",
    startDate: "",
    endDate: "",
    details: {
      title: "",
      imageUrl: "",
      rentPrice: "",
      day: "",
    },
    totalPrice: 10,
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
const startDate = new Date(formData.startDate); 
const endDate = new Date(formData.endDate); 
const differenceInTime = endDate.getTime() - startDate.getTime();
const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ agencyRef:listing.agencyRef,
        listingRef:listing._id,
        customer:currentUser.username,
        details:{
          title:listing.make + " "+ listing.model,
          imageUrl:listing.imageUrls[0],
          rentPrice:listing.rentalPrice,
          day:differenceInDays
        },
        totalPrice:price * differenceInDays});
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          agencyRef:listing.agencyRef,
          listingRef:listing._id,
          customer:currentUser.username,
          startDate,
          endDate,
          details:{
            title:listing.make + " "+ listing.model,
            imageUrl:listing.imageUrls[0],
            rentPrice:listing.rentalPrice,
            day:differenceInDays
          },
          totalPrice: price*differenceInDays

        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/profile`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Driveing License"
            className="border p-3 rounded"
            id="Dl"
            required
            onChange={handleChange}
            value={formData.Dl}
          />
          <input
            type="date"
            placeholder="Start Date"
            className="border p-3 rounded"
            id="startDate"
            required
            onChange={handleChange}
            value={formData.startDate}
          />
          <input
            type="date"
            placeholder="Rent Price"
            className="border p-3 rounded"
            id="endDate"
            required
            onChange={handleChange}
            value={formData.endDate}
          />
          <button
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Confirm Booking"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
        <div className="flex flex-col flex-1 gap-4"></div>
      </form>
    </main>
  );
}
