import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "VPC" },
    position: { x: 250, y: 5 },
  },
];

const initialEdges: any[] = [];

export default function InfraCanvas({ onExport }: { onExport: (data: any) => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleExport = () => {
    const architecture = {
      nodes: nodes.map((n) => ({ id: n.id, type: n.type, label: n.data.label })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    };
    onExport(architecture);
  };

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      <button
        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleExport}
      >
        Export Architecture
      </button>
    </div>
  );
}
