import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faPlus } from "@fortawesome/free-solid-svg-icons";

const CustomNode = ({ data, id, addNode, trigger, actions }) => {
  const [options, setOptions] = useState(false);
  const [selected, setSelected] = useState({});
  const isTrigger = id === "1";
  const nodeInfo = isTrigger
    ? trigger
    : actions[id] || { id, label: "Action", icon: faBolt };

  // const handleOtherOption = (e, nodeInfo) => {
  //   e.stopPropagation();
  //   setSelected({ id, ...nodeInfo });
  //   setOptions(!options);
  // };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow p-3 relative flex flex-col items-start cursor-pointer">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center bg-gray-200 text-gray-700 font-medium px-2 py-1 rounded-md text-[10px]">
          <FontAwesomeIcon
            icon={nodeInfo.icon}
            className="mr-1 text-gray-600"
          />
          {nodeInfo.label}
        </div>
        {/* <button
          className="text-[10px] border border-transparent hover:border-gray-100 hover:bg-gray-100 p-[5px] rounded-sm"
          onClick={(e) => {
            handleOtherOption(e, nodeInfo);
          }}
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button> */}
      </div>
      <p className="text-sm text-gray-600 mt-2 text-[10px] min-w-[200px]">
        {isTrigger
          ? `${data.nodeNo}. Select the event`
          : `${data.nodeNo}. Select the event for your Zep to run`}
      </p>
      <button
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] bg-gray-500 text-white h-5 w-5 rounded-full shadow-md hover:bg-gray-600 transition flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          addNode(id);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 cursor-pointer" />
      </button>
      {!isTrigger && <Handle type="target" position={Position.Top} />}
      <Handle type="source" position={Position.Bottom} />

      <div
        className={`${
          options ? "block" : "hidden"
        } absolute bg-white w-[100px] text-[10px] rounded-sm -right-28 shadow-xl p-2`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li className="border-b border-gray-200 text-gray-500">Rename</li>
          <li className="border-b border-gray-200 text-gray-500">Dublicate</li>
          <li className="border-b border-gray-200 text-gray-500">Copy</li>
          <li className="border-b border-gray-200 text-gray-500">
            Paste Below
          </li>
          <li className="border-b border-gray-200 text-gray-500">
            Paste to replace
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomNode;
