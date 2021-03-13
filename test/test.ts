import 'eslint';

describe('Nop', function dummyTest() {
  xit('test', () => {
    // This is here for lint purposes.
    const ob = { print: () => console.log('foo') };
    // This should NOT require squashing no-unused-expressions
    ob?.print();
  });
});
