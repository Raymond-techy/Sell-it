import { useEffect, useState, useRef } from "react";
import sellit from "../Components/Assets/Picture73.png";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidV4 } from "uuid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
function SellItem() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    location: "",
    battery: "",
    condition: "",
    ram: "",
    rom: "",
    mainCamera: "",
    selfieCamera: "",
    brand: "",
    narration: "",
    images: {},
  });
  const {
    model,
    battery,
    brand,
    name,
    mainCamera,
    selfieCamera,
    ram,
    rom,
    location,
    narration,
    images,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
          toast.info(
            "Please log in",
            { toastId: "r34-xAcu9#@(*" },
            { autoClose: 1000 }
          );
          return;
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (images.length > 4) {
      setLoading(false);
      toast.error("Images should not exceed 4", { toastId: "gcyuch45ub657" });
      return;
    }
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidV4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });
    console.log(imgUrls);
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listings added successfully");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };
  const onChange = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };
  if (loading) return <h1>Loading</h1>;
  return (
    <div className="min-h-screen mt-12 flex items-center justify-center py-16 mb-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-md w-full space-y-8 overflow-x-hidden">
        <div>
          <img alt="sellit" className="mx-auto h-12 w-auto" src={sellit} />
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitForm}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-4 ">
              <label htmlFor="email-address" className="sr-only">
                Phone Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={name}
                placeholder="Phone Name"
                onChange={onChange}
              />
            </div>
            <div className="passwordBox">
              <label htmlFor="password" className="sr-only">
                Brand
              </label>
              <select
                id="brand"
                name="brand"
                className="appearance-none rounded-none relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={brand}
                onChange={onChange}
                placeholder="Brand"
                required
              >
                <option>Select Phone Brand</option>
                <option>IPHONE</option>
                <option>SAMSUNG</option>
                <option>TECNO</option>
                <option>ITEL</option>
              </select>
              <input
                id="battery"
                name="battery"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
                placeholder="Battery(mah)"
                value={battery}
                onChange={onChange}
              />
              <input
                id="model"
                name="model"
                type="text"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
                placeholder="Model"
                value={model}
                onChange={onChange}
              />
            </div>

            <div className="mt-4 ">
              <label htmlFor="" className="sr-only">
                Main Camera
              </label>
              <select
                id="mainCamera"
                name="mainCamera"
                className="appearance-none rounded-none relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={mainCamera}
                onChange={onChange}
                required
              >
                <option>Main Camera</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mt-4 ">
              <label htmlFor="" className="sr-only">
                Selfie Camera
              </label>
              <select
                id="selfieCamera"
                name="selfieCamera"
                className="appearance-none rounded-none relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={selfieCamera}
                onChange={onChange}
                required
              >
                <option>Selfie Camera</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mt-4 ">
              <label htmlFor="" className="sr-only">
                RAM
              </label>
              <select
                id="ram"
                name="ram"
                className="appearance-none rounded-none relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={ram}
                onChange={onChange}
                required
              >
                <option>Phone's Ram</option>
                <option>4gb</option>
                <option>8gb</option>
                <option>16gb</option>
              </select>
            </div>

            <div className="mt-4 ">
              <label htmlFor="" className="sr-only">
                Internal Storage
              </label>
              <select
                id="rom"
                name="rom"
                className="appearance-none rounded-none relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={rom}
                onChange={onChange}
                required
              >
                <option>Internal Storage</option>
                <option>32gb</option>
                <option>64gb</option>
                <option>128gb</option>
                <option>256gb</option>
                <option>512gb</option>
              </select>
            </div>

            <div className="mt-4 ">
              <label htmlFor="email-address" className="sr-only">
                Your Location
              </label>
              <input
                name="location"
                id="location"
                type="text"
                required
                className="appearance-none rounded-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={location}
                placeholder="Your Location"
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email-address" className="sr-only">
                Describe Your Phone
              </label>
              <textarea
                id="narration"
                name="narration"
                className="appearance-none rounded-none relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={narration}
                onChange={onChange}
                placeholder="Describe the phone"
              ></textarea>
            </div>
            <div className="mt-4 ">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-slate-700"
              >
                Upload phone images(maximum of 4)
              </label>
              <input
                className="appearance-none rounded mt-2 relative block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="file"
                id="images"
                placeholder="Upload phone images"
                onChange={onChange}
                max="4"
                accept=".jpg,.png,.jpeg"
                multiple
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sell it
              <span className="absolute right-4 inset-y-0 flex items-center pl-3">
                <FaArrowCircleRight
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  color="white"
                />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellItem;
