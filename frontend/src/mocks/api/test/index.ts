import { rest } from 'msw';

import { data } from './data';

export const testHandler = [
  rest.get('/test', (_, res, ctx) => {
    return res(ctx.json({ status: 200, message: '', data: data }));
  }),
];
