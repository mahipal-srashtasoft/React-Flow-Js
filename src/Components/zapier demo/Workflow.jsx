import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Popup from "./Popup";
import CustomNode from "./CustomNode";
import SidePopup from "./SidePopup";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Workflow = () => {
  const [side_Popup_show, setSide_Popup_show]=useState(false)
  const [trigger, setTrigger] = useState({ label: "Trigger", icon: faBolt });
  const [actions, setActions] = useState({});

  const initialNodes = [
    {
      id: "1",
      type: "customNode",
      data: { label: trigger.label, nodeNo: 1 },
      position: { x: 250, y: 5 },
    },
    {
      id: "2",
      type: "customNode",
      data: { label: "Action", nodeNo: 2 },
      position: { x: 250, y: 150 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [idCounter, setIdCounter] = useState(2);
  const [popupContent, setPopupContent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isTriggerPopup, setIsTriggerPopup] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (parentId) => {
    // Check if the parent already has a child
    const existingChild = edges.find((edge) => edge.source === parentId);

    if (existingChild) {
      alert(
        "This node already has a child. Add a new node to the latest child."
      );
      return;
    }

    // Find the parent node's position
    const parentNode = nodes.find((node) => node.id === parentId);
    const lastNodePositionY = parentNode?.position?.y || 0;

    const newNodeId = uuidv4();
    const newNode = {
      id: newNodeId,
      type: "customNode",
      data: { label: `Action`, nodeNo: idCounter+1 },
      position: { x: 250, y: lastNodePositionY + 150 },
    };

    setNodes((nds) => [...nds, newNode]);
    setIdCounter(idCounter + 1);
    setActions((prev) => ({
      ...prev,
      [newNodeId]: { label: "Action", icon: faBolt },
    }));

    // Create an edge between parent and new node
    const newEdge = {
      id: `e${parentId}-${newNodeId}`,
      source: parentId,
      target: newNodeId,
    };
    setEdges((eds) => [...eds, newEdge]);
  };

  const handleNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
    setPopupContent(node.data.label);
    if (node.id === "1") {
      setIsTriggerPopup(true);
    } else {
      setIsPopupOpen(true);
    }
  };

  const updateTriggerNode = (label, icon) => {
    setTrigger({ label, icon });
    setIsTriggerPopup(false);
    setSide_Popup_show(true)

  };

  const updateActionNode = (nodeId, label, icon) => {
    setActions((prev) => ({
      ...prev,
      [nodeId]: { label, icon },
    }));
    setIsPopupOpen(false);
  };

  const nodeTypes = useMemo(
    () => ({
      customNode: (props) => (
        <CustomNode
          {...props}
          addNode={addNode}
          trigger={trigger}
          actions={actions}
        />
      ),
    }),
    [addNode, trigger, actions]
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
          onClose={() => setIsPopupOpen(false)}
          updateNode={(label, icon) =>
            updateActionNode(selectedNodeId, label, icon)
          }
        />
      )}

      {isTriggerPopup && (
        <Popup
          content="Select Trigger"
          onClose={() => setIsTriggerPopup(false)}
          updateNode={updateTriggerNode}
        />
      )}

      <SidePopup trigger={trigger} side_Popup_show={side_Popup_show}/>
    </div>
  );
};

export default Workflow;
