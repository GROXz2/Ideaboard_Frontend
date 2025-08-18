import { StateCreator } from 'zustand';
import Api from '../../client/Api';
import { Node, Edge } from '../../types/dto';
import { BoardsSlice } from './boardsSlice';

export interface CanvasSlice {
  nodes: Node[];
  edges: Edge[];
  connectMode: boolean;
  selectedNodeId?: string;
  toggleConnectMode: () => void;
  createNode: (n: Partial<Node>) => Promise<void>;
  updateNode: (id: string, patch: Partial<Node>) => Promise<void>;
  deleteNode: (id: string) => Promise<void>;
  createEdge: (from: string, to: string) => Promise<void>;
  deleteEdge: (id: string) => Promise<void>;
  selectNode: (id?: string) => void;
  moveNode: (id: string, x: number, y: number) => void;
}

export const createCanvasSlice: StateCreator<CanvasSlice & BoardsSlice> = (set, get) => ({
  nodes: [],
  edges: [],
  connectMode: false,
  selectedNodeId: undefined,
  toggleConnectMode: () => set((s) => ({ connectMode: !s.connectMode })),
  createNode: async (n) => {
    const res = await Api.post(`/boards/${get().activeBoardId}/nodes`, n);
    set({ nodes: [...get().nodes, res.data.node] });
  },
  updateNode: async (id, patch) => {
    await Api.patch(`/nodes/${id}`, patch);
    set({ nodes: get().nodes.map((n) => (n.id === id ? { ...n, ...patch } : n)) });
  },
  deleteNode: async (id) => {
    await Api.delete(`/nodes/${id}`);
    set({ nodes: get().nodes.filter((n) => n.id !== id) });
  },
  createEdge: async (from, to) => {
    const res = await Api.post(`/boards/${get().activeBoardId}/edges`, { from, to });
    set({ edges: [...get().edges, res.data.edge] });
  },
  deleteEdge: async (id) => {
    await Api.delete(`/edges/${id}`);
    set({ edges: get().edges.filter((e) => e.id !== id) });
  },
  selectNode: (id) => set({ selectedNodeId: id }),
  moveNode: (id, x, y) => set({ nodes: get().nodes.map((n) => (n.id === id ? { ...n, x, y } : n)) }),
});
