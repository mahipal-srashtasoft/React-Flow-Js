import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCalendar, faBolt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faSlack, faFacebook, faHubspot } from "@fortawesome/free-brands-svg-icons";

const apps = [
  { name: "Gmail", icon: faEnvelope },
  { name: "Facebook Lead Ads", icon: faFacebook },
  { name: "Google Calendar", icon: faCalendar },
  { name: "Google Drive", icon: faGoogle },
  { name: "Google Sheets", icon: faGoogle },
  { name: "HubSpot", icon: faHubspot },
  { name: "Slack", icon: faSlack },
  { name: "Custom Webhook", icon: faBolt },
];

const Popup = ({ onClose, updateNode }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-start top-6 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[550px]">
        <input
          type="text"
          placeholder="Search apps and tools..."
          className="w-full p-2 border rounded-md text-md focus:outline-none"
        />

        <div className="mt-4">
          <h3 className="text-md font-semibold">Select an App</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {apps.map((app, index) => (
              <div
                key={index}
                className="flex items-center text-md hover:bg-sky-100 transition-all ease-in-out duration-200 p-1 rounded-sm cursor-pointer"
                onClick={() => updateNode(app.name, app.icon)}
              >
                <FontAwesomeIcon icon={app.icon} className="mr-2" />
                {app.name}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;