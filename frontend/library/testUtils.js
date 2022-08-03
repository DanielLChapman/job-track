import casual from 'casual';

casual.seed(231313);

const fakeUser = (overrides) => ({
    __typename: 'User',
    id: '4234',
    name: casual.name,
    email: casual.email,
    ...overrides,
  });

  export {
    fakeUser
  }