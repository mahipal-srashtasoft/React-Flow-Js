import React from "react";
import { Handle, Position } from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addNode, setPopupState } from "../Slices/workflowSlice";
import { useSelector } from "react-redux";

const CustomNode = ({ data, id }) => {
  const isTrigger = id === "1";
  const { trigger, actions } = useSelector((state) => state.workflow);
  const nodeInfo = isTrigger
    ? trigger
    : actions[id] || { id, label: "Action", icon: faBolt };

  const dispatch = useDispatch();

  const handleAddNode = (e) => {
    e.stopPropagation();
    dispatch(addNode({ parentId: id, newNode: { id: `${id}-${Date.now()}`, type: 'customNode', data: { label: `Action`, nodeNo: data.nodeNo + 1 }, position: { x: 250, y: 150 } } }));
  };

  const handleNodeClick = (e) => {
    e.stopPropagation();
    dispatch(
      setPopupState({
        isPopupOpen: !isTrigger,
        isTriggerPopup: isTrigger,
        selectedNodeId: id,
        popupContent: nodeInfo.label,
      })
    );
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow p-3 relative flex flex-col items-start cursor-pointer" onClick={handleNodeClick}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center bg-gray-200 text-gray-700 font-medium px-2 py-1 rounded-md text-[10px]">
          <FontAwesomeIcon
            icon={nodeInfo.icon}
            className="mr-1 text-gray-600"
          />
          {nodeInfo.label}
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2 text-[10px] min-w-[200px]">
        {isTrigger
          ? `${data.nodeNo}. Select the event`
          : `${data.nodeNo}. Select the event for your Zep to run`}
      </p>
      <button
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] bg-gray-500 text-white h-5 w-5 rounded-full shadow-md hover:bg-gray-600 transition flex items-center justify-center"
        onClick={handleAddNode}
      >
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 cursor-pointer" />
      </button>
      {!isTrigger && <Handle type="target" position={Position.Top} />}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;