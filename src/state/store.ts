import { create } from 'zustand';
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createBoardsSlice, BoardsSlice } from './slices/boardsSlice';
import { createCanvasSlice, CanvasSlice } from './slices/canvasSlice';
import { createAISlice, AISlice } from './slices/aiSlice';
import { createTemplatesSlice, TemplatesSlice } from './slices/templatesSlice';
import { createTasksSlice, TasksSlice } from './slices/tasksSlice';

export type StoreState = AuthSlice & BoardsSlice & CanvasSlice & AISlice & TemplatesSlice & TasksSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createBoardsSlice(...a),
  ...createCanvasSlice(...a),
  ...createAISlice(...a),
  ...createTemplatesSlice(...a),
  ...createTasksSlice(...a),
}));
