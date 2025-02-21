import React, { useCallback, useMemo } from "react";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSidePopupShow,
  addNode,
  updateTriggerNode,
  updateActionNode,
  setPopupState,
} from "../Slices/workflowSlice";
import CustomNode from "./CustomNode";
import Popup from "./Popup";
import SidePopup from "./SidePopup";

const WorkflowRedux = () => {
  const dispatch = useDispatch();
  const {
    sidePopupShow,
    trigger,
    actions,
    nodes: initialNodes,
    edges: initialEdges,
    isPopupOpen,
    isTriggerPopup,
    selectedNodeId,
    popupContent,
  } = useSelector((state) => state.workflow);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      customNode: (props) => (
        <CustomNode
          {...props}
          trigger={trigger}
          actions={actions}
        />
      ),
    }),
    [trigger, actions]
  );

  return (
    <div className="h-screen w-full flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full h-full border rounded-lg overflow-hidden shadow-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          zoomOnScroll={false}
          panOnScroll 
          panOnDrag 
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {isPopupOpen && selectedNodeId && (
        <Popup
          content={popupContent}
          onClose={() => dispatch(setPopupState({ isPopupOpen: false, isTriggerPopup: false, selectedNodeId: null, popupContent: null }))}
          updateNode={(label, icon) => dispatch(updateActionNode({ nodeId: selectedNodeId, label, icon }))}
        />
      )}

      {isTriggerPopup && (
        <Popup
          content="Select Trigger"
          onClose={() => dispatch(setPopupState({ isPopupOpen: false, isTriggerPopup: false, selectedNodeId: null, popupContent: null }))}
          updateNode={(label, icon) => dispatch(updateTriggerNode({ label, icon }))}
        />
      )}
{console.log("sidePopupShow", sidePopupShow)}
{console.log("trigger", trigger)}
      <SidePopup trigger={trigger} side_Popup_show={sidePopupShow} />
    </div>
  );
};

export default WorkflowRedux;