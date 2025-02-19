import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useCallback, useState } from "react";

const initialEdges = [
  // { id: "1-2", source: "1", target: "2"  },
  {
    id: "1-3",
    source: "1",
    target: "3",
    animated: true,
    label: "animated : true",
    style: { stroke: "green" },
  },
  {
    id: "2-3",
    source: "2",
    target: "3",
    label: "type : smoothstep",
    type: "smoothstep",
    markerEnd:{type:MarkerType.Arrow}
  },
];

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "Hello1",
    },
  },
  {
    id: "2",
    position: { x: 150, y: 150 },
    data: {
      label: "Mahipal2",
    },
  },
  {
    id: "3",
    position: { x: 350, y: 150 },
    data: {
      label: "Mahipal3",
    },
  },
];
function Demo() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const nodeChangeHandle = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const edgesChangeHandle = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <>
      <div id="app">
        <ReactFlow
          nodes={nodes}
          onNodesChange={nodeChangeHandle}
          edges={edges}
          onEdgesChange={edgesChangeHandle}
          onConnect={onConnect}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} color="gray" gap={28} />
          <Controls />
          <MiniMap  />
        
        </ReactFlow>
      </div>
    </>
  );
}

export default Demo;
