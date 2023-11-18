import React from "react";

const Table = ({ booking }) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Customer Id
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
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
                      {booking.user}
                    </th>
                    <td className="px-6 py-4 ">
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
