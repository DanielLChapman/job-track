
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../library/testUtils';

const fakeUserObj = fakeUser();
const notSignedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { authenticatedItem: null } },
    },
  ];
  

  const signedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { authenticatedItem: fakeUser() } },
    },
  ];

  export {
    notSignedInMocks,
    signedInMocks,
}