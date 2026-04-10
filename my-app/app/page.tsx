'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { addEdge, Background, Controls, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { seedNodes, seedEdges } from '../data/seed';

const ReactFlow = dynamic(
  () => import('reactflow').then((mod) => mod.ReactFlow),
  { ssr: false }
);

export default function Page() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('graphData');

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.nodes?.length) {
        setNodes(parsed.nodes);
        setEdges(parsed.edges);
        return;
      }
    }

    const initialNodes: Node[] = seedNodes.map((n, i) => ({
      id: n.id,
      data: { label: n.title, note: n.note },
      position: {
        x: (i % 3) * 250,
        y: Math.floor(i / 3) * 150,
      },
      style: {
        padding: 14,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        background: '#ffffff',
        width: 170,
        fontWeight: 500,
        color: '#111827', // ✅ FIX (node text visible)
      },
    }));

    const initialEdges: Edge[] = seedEdges.map((e, i) => ({
      id: `e-${i}`,
      ...e,
      label: e.label,
    }));

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  useEffect(() => {
    if (nodes.length) {
      localStorage.setItem('graphData', JSON.stringify({ nodes, edges }));
    }
  }, [nodes, edges]);

  const onNodeClick = (_: any, node: Node) => {
    setSelectedNode(node);
  };

  const addNode = () => {
    const newNode: Node = {
      id: Date.now().toString(),
      data: { label: '', note: '' },
      position: { x: 200, y: 200 },
      style: {
        padding: 14,
        borderRadius: 12,
        border: '2px solid #6366f1',
        background: '#eef2ff',
        width: 170,
        color: '#111827', // ✅ FIX
      },
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedNode(newNode);
  };

  const deleteNode = () => {
    if (!selectedNode) return;

    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  };

  const onConnect = (params: any) => {
    setEdges((eds) => addEdge({ ...params, label: 'relates to' }, eds));
  };

  const onEdgeClick = (_: any, edge: Edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  const onNodeDragStop = (_: any, node: Node) => {
    setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f9fafb' }}>
      {/* GRAPH */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* TOP BAR */}
        <div
          style={{
            position: 'absolute',
            top: 15,
            left: 15,
            zIndex: 1000,
            display: 'flex',
            gap: 10,
          }}
        >
          <button
            onClick={addNode}
            style={{
              padding: '10px 16px',
              background: '#4f46e5',
              color: '#fff',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + Add Node
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('graphData');
              location.reload();
            }}
            style={{
              padding: '10px 16px',
              background: '#e5e7eb',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          onNodeDragStop={onNodeDragStop}
          fitView
        >
          <Background color="#ddd" gap={16} />
          <Controls />
        </ReactFlow>
      </div>

      {/* SIDEBAR */}
      {selectedNode && (
        <div
          style={{
            width: '340px',
            background: '#ffffff',
            padding: '24px',
            borderLeft: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div>
            <h2 style={{ margin: 0, color: '#111827' }}>Edit Node</h2>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>
              Click inside fields to edit
            </p>
          </div>

          {/* TITLE INPUT */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Title</label>
            <input
              placeholder="Enter node title..."
              value={selectedNode.data.label}
              style={{
                width: '100%',
                marginTop: 6,
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                outline: 'none',
                fontSize: '14px',
                background: '#ffffff',
                color: '#111827', // ✅ FIX
                caretColor: '#111827', // ✅ cursor visible
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #6366f1')}
              onBlur={(e) => (e.target.style.border = '1px solid #d1d5db')}
              onChange={(e) => {
                const value = e.target.value;

                setNodes((nds) =>
                  nds.map((n) =>
                    n.id === selectedNode.id
                      ? { ...n, data: { ...n.data, label: value } }
                      : n
                  )
                );

                setSelectedNode((prev: any) => ({
                  ...prev,
                  data: { ...prev.data, label: value },
                }));
              }}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>
              Description
            </label>
            <textarea
              placeholder="Write description..."
              value={selectedNode.data.note || ''}
              rows={5}
              style={{
                width: '100%',
                marginTop: 6,
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                outline: 'none',
                fontSize: '14px',
                background: '#ffffff',
                color: '#111827', // ✅ FIX
                caretColor: '#111827',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #6366f1')}
              onBlur={(e) => (e.target.style.border = '1px solid #d1d5db')}
              onChange={(e) => {
                const value = e.target.value;

                setNodes((nds) =>
                  nds.map((n) =>
                    n.id === selectedNode.id
                      ? { ...n, data: { ...n.data, note: value } }
                      : n
                  )
                );

                setSelectedNode((prev: any) => ({
                  ...prev,
                  data: { ...prev.data, note: value },
                }));
              }}
            />
          </div>

          {/* ACTIONS */}
          <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
            <button
              onClick={deleteNode}
              style={{
                flex: 1,
                padding: '12px',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '10px',
                border: 'none',
                fontWeight: 600,
              }}
            >
              Delete
            </button>

            <button
              onClick={() => setSelectedNode(null)}
              style={{
                flex: 1,
                padding: '12px',
                background: '#111827',
                color: '#fff',
                borderRadius: '10px',
                border: 'none',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}