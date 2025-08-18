import { StateCreator } from 'zustand';
import Api from '../../client/Api';
import { Board } from '../../types/dto';
import { CanvasSlice } from './canvasSlice';

export interface BoardsSlice {
  boards: Board[];
  activeBoardId?: string;
  loadBoards: () => Promise<void>;
  createBoard: (title: string) => Promise<Board>;
  openBoard: (id: string) => Promise<void>;
}

export const createBoardsSlice: StateCreator<BoardsSlice & CanvasSlice> = (set, get) => ({
  boards: [],
  activeBoardId: undefined,
  loadBoards: async () => {
    const res = await Api.get('/boards');
    set({ boards: res.data.boards });
  },
  createBoard: async (title) => {
    const res = await Api.post('/boards', { title });
    set({ boards: [...get().boards, res.data.board] });
    return res.data.board;
  },
  openBoard: async (id) => {
    const res = await Api.get(`/boards/${id}`);
    set({ activeBoardId: id, nodes: res.data.nodes, edges: res.data.edges });
  },
});
