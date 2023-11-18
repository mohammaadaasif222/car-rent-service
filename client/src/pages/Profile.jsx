import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ProfileLayout from "../components/ProfileLayout";
import Table from "../components/Table";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const changePage = (index) => {
    setCurrentIndex(index);
  };



  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/agency/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/agency/listings/${currentUser._id}`);
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const getBookings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/booking/agency/get`);
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setBookings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const getUserBookings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/booking/user/get`);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setBookings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    if (currentIndex === 1) {
      handleShowListings();
    }
    if (currentIndex === 2) {
      getBookings();
    }
    if (currentIndex === 3) {
      getUserBookings();
    }
  }, [file, currentIndex]);
  return (
    <>
      <Dashboard pageChange={changePage} />
      {currentIndex === 0 ? (
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <span
                  onClick={handleDeleteUser}
                  className="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm  bg-slate-100 leading-6 uppercase duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1"
                >
                  Delete account
                </span>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <span
                  onClick={handleSignOut}
                  className="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm  bg-slate-100 leading-6 uppercase duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-200 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1"
                >
                  Sign out
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center p-5 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-1/2"
              >
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <img
                  onClick={() => fileRef.current.click()}
                  src={formData.avatar || currentUser.avatar}
                  alt="profile"
                  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
                <p className="text-sm self-center">
                  {fileUploadError ? (
                    <span className="text-red-700">
                      Error Image upload (image must be less than 2 mb)
                    </span>
                  ) : filePerc > 0 && filePerc < 100 ? (
                    <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                  ) : filePerc === 100 ? (
                    <span className="text-green-700">
                      Image successfully uploaded!
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <input
                  type="text"
                  placeholder="username"
                  defaultValue={currentUser.username}
                  id="username"
                  className="border p-3 rounded"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="email"
                  id="email"
                  defaultValue={currentUser.email}
                  className="border p-3 rounded"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                  id="password"
                  className="border p-3 rounded"
                />
                <button
                  disabled={loading}
                  className="bg-slate-700 text-white rounded p-3 uppercase hover:opacity-95 disabled:opacity-80"
                >
                  {loading ? "Loading..." : "Update"}
                </button>
              </form>

              <p className="text-red-700 mt-5">{error ? error : ""}</p>
              <p className="text-green-700 mt-5">
                {updateSuccess ? "User is updated successfully!" : ""}
              </p>
            </div>
          </div>
        </div>
      ) : currentIndex === 1 ? (
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                {currentUser.role === "agency" && (
                  <>
                    <Link
                      className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
                      to={"/create-listing"}
                    >
                      Create Listing
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className=" p-3 items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800">
              {currentUser.role === "agency" &&
                userListings &&
                userListings.length > 0 && (
                  <div className="gap-4 ">
                    {userListings.map((listing) => (
                      <div
                        key={listing._id}
                        className="border rounded p-3 flex justify-between items-center gap-4 my-5"
                      >
                        <Link to={`/listing/${listing._id}`}>
                          <img
                            src={listing.imageUrls[0]}
                            alt="listing cover"
                            className="w-20 object-contain"
                          />
                        </Link>
                        <Link
                          className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                          to={`/listing/${listing._id}`}
                        >
                          <p>{listing.name}</p>
                        </Link>

                        <div className="flex flex-col item-center">
                          <button
                            onClick={() => handleListingDelete(listing._id)}
                            className="text-red-700 uppercase"
                          >
                            Delete
                          </button>
                          <Link to={`/update-listing/${listing._id}`}>
                            <button className="text-green-700 uppercase">
                              Edit
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              <p className="text-red-700 mt-5">
                {showListingsError ? "Error showing listings" : ""}
              </p>
            </div>
          </div>
        </div>
      ) : currentIndex === 2 ? (
        <ProfileLayout>
          <Table booking={bookings} />
        </ProfileLayout>
      ) : currentIndex === 3 ? (
        <ProfileLayout>
          <Table booking={bookings} />
        </ProfileLayout>
      ) : (
        ""
      )}
    </>
  );
}
