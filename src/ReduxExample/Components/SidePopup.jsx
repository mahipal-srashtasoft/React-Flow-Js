import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setSidePopupShow } from "../Slices/workflowSlice";

const SidePopup = ({ trigger, side_Popup_show }) => {
  const [isOpen, setIsOpen] = useState(side_Popup_show);

  const dispatch = useDispatch();

  useEffect(() => {
    if (trigger.label === "Trigger" && side_Popup_show) {
        setIsOpen(true);
    }
}, [side_Popup_show, trigger.label]); // Depend on both variables


  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div className="side_popup z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-xl border-2 border-dashed border-cyan-600">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">1. Select the event</h2>
                <div className="space-x-3">
                  <button
                    onClick={() => dispatch(setSidePopupShow(false))}
                    className="cursor-pointer p-1"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <label className="block text-sm font-medium">App *</label>
                <div className="flex items-center border rounded-md p-2 mt-1">
                  <FontAwesomeIcon
                    icon={trigger.icon}
                    className="mr-1 text-gray-600"
                  />
                  <span>{trigger.label}</span>
                  <button className="ml-auto text-blue-600">Change</button>
                </div>

                <label className="block text-sm font-medium mt-4">
                  Trigger event *
                </label>
                <select className="w-full border p-2 rounded-md mt-1">
                  <option value="">Choose an event</option>
                  {/* Render trigger events */}
                </select>

                <label className="block text-sm font-medium mt-4">
                  Account *
                </label>
                <div className="border rounded-md p-2 mt-1 flex justify-between">
                  <span>{/* Render account */}</span>
                  <button className="text-blue-600">Change</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidePopup;
