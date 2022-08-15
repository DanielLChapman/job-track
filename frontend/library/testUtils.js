import casual from 'casual';

casual.seed(231313);

const fakeUser = (overrides) => ({
    __typename: 'User',
    id: '4234',
    name: casual.name,
    jobs: [],
    email: casual.email,
    ...overrides,
  });

  const fakeJob = (overrides) => ({
    __typename: 'User',
    id: '4234',
    name: casual.name,
    publishedAt: casual.date('YYYY-MM-DD'),
    applicationDate: casual.date('YYYY-MM-DD'),
    status: "waiting",
    author: fakeUser().id,
    salaryExpectation: 0,
    notes: casual.sentence,
    ...overrides,
  });

  export {
    fakeUser,
    fakeJob
  }
