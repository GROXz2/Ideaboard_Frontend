import { Board, Node, Edge, Template, Task, AIThread } from '../../types/dto';

export const fixtures = {
  user: { id: 'u1', email: 'user@example.com' },
  boards: [{ id: 'b1', title: 'Demo Board' }] as Board[],
  nodes: [{ id: 'n1', title: 'Role', kind: 'role', x: 40, y: 40 }] as Node[],
  edges: [] as Edge[],
  templates: [{ id: 't1', title: 'Starter', description: 'Demo template', price: 0 }] as Template[],
  tasks: [] as Task[],
  threads: [] as AIThread[],
};
