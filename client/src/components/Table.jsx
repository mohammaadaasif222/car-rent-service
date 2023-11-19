import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Table = ({ booking }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, loading]);

  const handleSelect = async (e, id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/booking/agency/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: e.target.value }),
      });

      const data = await res.json();
      setLoading(false);

      setMessage(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      {message && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 gap-3"
          role="alert"
        >
          <span className="font-medium">{message}</span>
          <span className="text-xs text-green-800">
            Reload the component to see the changes!
          </span>
        </div>
      )}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Customer
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            {currentUser.role == "agency" && (
              <th scope="col" className="px-6 py-3">
                Change Status
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Car Title
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Days
            </th>
            <th scope="col" className="px-6 py-3">
              Price/Day
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {booking
            ? booking.map((booking) => {
                return (
                  <tr
                    className="border-b border-gray-200 dark:border-gray-700"
                    key={booking._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      {booking.user.slice(0,5)}
                    </th>
                    <td className="px-6 py-4">
                      {booking.status === "pending" ? (
                        <span className="inline-flex items-center  bg-yellow-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                          {booking.status}
                        </span>
                      ) : booking.status === "confirm" ? (
                        <span className="inline-flex items-center  bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          {booking.status}
                        </span>
                      ) : booking.status === "cancel" ? (
                        <span className="inline-flex items-center  bg-red-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                          {booking.status}
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    {currentUser.role === "agency" && (
                      <td className="px-6 py-4">
                        <select
                          onChange={(e) => handleSelect(e, booking._id)}
                          className=" px-2.5 py-0.5   block border-gray-200 rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        >
                          <option value="pending">pending</option>
                          <option value="confirm">confirm</option>
                          <option value="cancel">cancel</option>
                        </select>
                      </td>
                    )}
                    <td className="px-6 py-4">{booking.details.title}</td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      {booking.details.day}
                    </td>
                    <td className="px-6 py-4">{booking.details.rentPrice}</td>
                    <td className="px-6 py-4">{booking.totalPrice}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
