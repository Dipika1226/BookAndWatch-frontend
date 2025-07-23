import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCity } from "../utils/locationSlice";

export default function LocationDropdown() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Select City");
  const dispatch = useDispatch();

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    dispatch(setCity(city));
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:7777/api/cities"); // Change base URL if needed
        setCities(res.data);
        setSelectedCity(res.data[0] || "Select City");
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    fetchCities();
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left z-50 ">
      <Menu.Button className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-amber-400/45  bg-transparent transition duration-200 ease-in-out ">
        <FaMapMarkerAlt className="text-white" />
        <span className="text-white font-medium">{selectedCity}</span>
        <ChevronDownIcon className="w-4 h-4 text-white" />
      </Menu.Button>

      <Menu.Items className="absolute left-0 mt-7 w-44 max-h-60 overflow-y-auto origin-top-right divide-y divide-gray-900 rounded-md bg-neutral-900/50 shadow-lg ring-1 ring-black/5 focus:outline-none">
        {cities.map((city) => (
          <Menu.Item key={city}>
            {({ active }) => (
              <button
                onClick={() => handleCitySelect(city)}
                className={`${
                  active ? "bg-amber-400/45 text-white" : "text-white"
                } group flex w-full items-center px-4 py-2 text-sm `}
              >
                {city}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
