import MockAdapter from 'axios-mock-adapter';
import Api from '../Api';
import { fixtures } from './fixtures';

export function initMockServer() {
  const mock = new MockAdapter(Api, { delayResponse: 200 });

  mock.onPost('/auth/login').reply(200, { token: 'mock-token', user: fixtures.user });
  mock.onPost('/auth/signup').reply(200, { token: 'mock-token', user: fixtures.user });
  mock.onGet('/me').reply(200, { user: fixtures.user });

  mock.onGet('/boards').reply(200, { boards: fixtures.boards });
  mock.onPost('/boards').reply((config) => {
    const { title } = JSON.parse(config.data);
    const board = { id: `b${Date.now()}`, title };
    fixtures.boards.push(board);
    return [200, { board }];
  });
  mock.onGet(/\/boards\/\w+/).reply((config) => {
    const id = config.url!.split('/').pop()!;
    return [200, { board: fixtures.boards.find((b) => b.id === id), nodes: fixtures.nodes, edges: fixtures.edges }];
  });

  mock.onPost(/\/boards\/\w+\/nodes/).reply((config) => {
    const node = { id: `n${Date.now()}`, ...JSON.parse(config.data) };
    fixtures.nodes.push(node as any);
    return [200, { node }];
  });
  mock.onPatch(/\/nodes\/\w+/).reply((config) => {
    const id = config.url!.split('/').pop()!;
    const patch = JSON.parse(config.data);
    const node = fixtures.nodes.find((n) => n.id === id);
    Object.assign(node!, patch);
    return [200, { node }];
  });
  mock.onDelete(/\/nodes\/\w+/).reply((config) => {
    const id = config.url!.split('/').pop()!;
    fixtures.nodes = fixtures.nodes.filter((n) => n.id !== id);
    return [200];
  });

  mock.onPost(/\/boards\/\w+\/edges/).reply((config) => {
    const edge = { id: `e${Date.now()}`, ...JSON.parse(config.data) };
    fixtures.edges.push(edge as any);
    return [200, { edge }];
  });
  mock.onDelete(/\/edges\/\w+/).reply((config) => {
    const id = config.url!.split('/').pop()!;
    fixtures.edges = fixtures.edges.filter((e) => e.id !== id);
    return [200];
  });

  mock.onPost('/ai/run').reply(() => {
    const message = { id: `m${Date.now()}`, role: 'assistant', content: 'ok', tokens_in: 10, tokens_out: 20, usd_cost: 0.001 };
    return [200, { threadId: 't1', message }];
  });
  mock.onGet(/\/ai\/threads/).reply(200, { threads: fixtures.threads });

  mock.onGet('/templates').reply(200, { templates: fixtures.templates });
  mock.onGet(/\/templates\/\w+/).reply((config) => {
    const id = config.url!.split('/').pop()!;
    return [200, { template: fixtures.templates.find((t) => t.id === id) }];
  });
  mock.onPost(/\/templates\/\w+\/instantiate/).reply(200, {});
  mock.onPost('/purchases').reply(200, {});

  mock.onGet(/\/tasks/).reply(200, { tasks: fixtures.tasks });
  mock.onPost('/tasks').reply((config) => {
    const task = { id: `task${Date.now()}`, title: 'New Task', done: false, ...JSON.parse(config.data) };
    fixtures.tasks.push(task as any);
    return [200, { task }];
  });
  mock.onPatch(/\/tasks\/\w+/).reply((config) => {
    const id = config.url!.split('/').pop()!;
    const patch = JSON.parse(config.data);
    const task = fixtures.tasks.find((t) => t.id === id);
    Object.assign(task!, patch);
    return [200, { task }];
  });

  return mock;
}
