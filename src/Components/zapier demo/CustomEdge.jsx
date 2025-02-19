// import { BaseEdge, getBezierPath } from "@xyflow/react";

// export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
//   const [edgePath, labelX, labelY] = getBezierPath({
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//   });

//   return (
//     <>
//       {/* Custom Edge Path */}
//       <BaseEdge id={id} path={edgePath} style={{ stroke: "blue", strokeWidth: 2 }} />

//       {/* Edge Label */}
//       <text x={labelX} y={labelY} fill="black" fontSize={12} textAnchor="middle">
//         Custom Label
//       </text>
//     </>
//   );
// }

import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  console.log(labelX, labelY);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="border text-white p-1! bg-red-600 rounded-md text-[12px]"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          Delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
