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
  setTrigger,
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

  const handleNodeClick = (event, node) => {
    dispatch(
      setPopupState({
        isPopupOpen: node.id !== "1",
        isTriggerPopup: node.id === "1",
        selectedNodeId: node.id,
        popupContent: node.data.label,
      })
    );
  };

  const nodeTypes = useMemo(
    () => ({
      customNode: (props) => (
        <CustomNode
          {...props}
          addNode={(id) => dispatch(addNode({ parentId: id, newNode: { id: `${id}-${Date.now()}`, type: 'customNode', data: { label: `Action`, nodeNo: nodes.length + 1 }, position: { x: 250, y: 150 } } }))}
          trigger={trigger}
          actions={actions}
        />
      ),
    }),
    [dispatch, trigger, actions, nodes.length]
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
          onNodeClick={handleNodeClick}
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

      <SidePopup trigger={trigger} side_Popup_show={sidePopupShow} />
    </div>
  );
};

export default WorkflowRedux;