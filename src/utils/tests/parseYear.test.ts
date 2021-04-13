import { parseYear } from '../parseYear';

test('parseYear outputs date in correct format', () => {
  const result = parseYear('2006-05-05');
  expect(result).toEqual('2006');
});
