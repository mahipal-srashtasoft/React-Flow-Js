import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
} from "@xyflow/react";
import React, { useState, useCallback } from "react";

const initialNodes = [
  { id: "1", position: { x: 50, y: 0 }, data: { label: "Node 1" } },
  { id: "2", position: { x: 200, y: 100 }, data: { label: "Node 2" } },
  { id: "3", position: { x: 350, y: 200 }, data: { label: "Node 3" } },
  { id: "4", position: { x: 500, y: 300 }, data: { label: "Node 4" } },
  { id: "5", position: { x: 650, y: 400 }, data: { label: "Node 5" } },
  {
    id: "result",
    position: { x: 800, y: 500 },
    data: { label: "Submitted Data" },
  },
];

const edgesData = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-result", source: "5", target: "result" },
];

const NodeForms = {
  1: ({ formData, setFormData }) => (
    <>
      <label>
        Name:{" "}
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </label>
    </>
  ),
  2: ({ formData, setFormData }) => (
    <>
      <label>
        Email:{" "}
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </label>
    </>
  ),
  3: ({ formData, setFormData }) => (
    <>
      <label>
        Phone:{" "}
        <input
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </label>
    </>
  ),
  4: ({ formData, setFormData }) => (
    <>
      <label>
        Address:{" "}
        <input
          type="text"
          value={formData.address || ""}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </label>
    </>
  ),
  5: ({ formData, setFormData }) => (
    <>
      <label>
        City:{" "}
        <input
          type="text"
          value={formData.city || ""}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </label>
    </>
  ),
};

const NodeForm = ({ nodeId, formData, setFormData, onClose, onSubmit }) => {
  const FormContent = NodeForms[nodeId] || (() => <p>No form available</p>);
  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        top: 50,
        width: "300px",
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        background: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Form for Node {nodeId}</h3>
        <i
          className="fa fa-times"
          aria-hidden="true"
          style={{ cursor: "pointer" }}
          onClick={onClose}
        ></i>
      </div>
      <FormContent formData={formData} setFormData={setFormData} />
      <button
        onClick={onSubmit}
        style={{
          background: "#28a745",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Submit
      </button>
      <button
        onClick={onClose}
        style={{
          background: "#007bff",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default function FlowWithForms() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useState(edgesData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(formData)

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node.id);
  }, []);

  const handleSubmit = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === "result"
          ? {
              ...node,
              data: {
                label: Object.entries(formData)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join("\n"),
              },
            }
          : node
      )
    );
    setSelectedNode(null);
  };

  return (
    <ReactFlowProvider>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          background: "#f4f4f4",
        }}
      >
        <div style={{ flex: 1, height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            fitView
          />
          <MiniMap />
          <Controls />
          <Background />
        </div>
        {selectedNode && (
          <NodeForm
            nodeId={selectedNode}
            formData={formData}
            setFormData={setFormData}
            onClose={() => setSelectedNode(null)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </ReactFlowProvider>
  );
}
