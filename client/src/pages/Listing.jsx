import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import BookingForm from "../components/BookingForm";
import "swiper/css/bundle";
import {
  FaChair,
  FaMapMarkerAlt,
  FaShare,
  FaGasPump,
  FaCar,
  FaTachometerAlt,
} from "react-icons/fa";
import Contact from "../components/Contact";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  console.log(listing);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.make + " - " + listing.model} - ${""}
              {/* {listing.rentalPrice.toLocaleString('en-US')} */}
              {listing.rentalPrice.toLocaleString("en-US") + " / day"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              1234 Oak Street Maplewood, CA 98765 USA
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                For Rent
              </p>

              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                ${+listing.rentalPrice - +10} OFF
              </p>
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaGasPump className="text-lg" />
                {listing.fuelType}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCar className="text-lg" />
                {listing.transmission}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaTachometerAlt className="text-lg" />
                {"mileage" + " " + listing.mileage}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.year}
              </li>
              Features :{" "}
              {listing.features.map((item, index) => {
                return (
                  <li
                    key={item + new Date()}
                    className="flex items-center gap-1 whitespace-nowrap "
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact ? (
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                {!showForm ? "  Continue to Book" : "Cancel"}
              </button>
            ) : (
              <Link to="/sign-in">
                <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                  Continue to Book
                </button>
              </Link>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
      {showForm && <BookingForm currentUser={currentUser} listing={listing} />}
    </main>
  );
}
