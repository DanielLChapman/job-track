import {act, screen, render} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import {signedInMocks, notSignedInMocks} from '../../Helper/GeneralMocks'
import wait from 'waait';
import FrontPage from '../../components/FrontPage';
import { fakeUser } from '../../library/testUtils';

const user = fakeUser();

describe('It insures the front page renders text when not logged in', () => {
    it ('has a title, and two buttons when not logged in', () => {
        const { container, debug} = render(
            <MockedProvider >
                <FrontPage  />
            </MockedProvider>
        )

        expect(container).toMatchSnapshot();
    })

    it ('renders a different header when logged in', async () => {
        const {container: container2, debug: debug2} = render(
            <MockedProvider >
                <FrontPage />
            </MockedProvider>
        )
        const { container, debug} = render(
            <MockedProvider mocks={signedInMocks}>
                <FrontPage user={user} />
            </MockedProvider>
        )

        await act(async() => {
            await wait(0);
        });
        expect(container).toMatchSnapshot();
        expect(container).not.toBe(container2);
    })

    it ('makes sure that it is rendering the user front page when signed in', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={signedInMocks}>
                <FrontPage user={user} />
            </MockedProvider>
        )

        await act(async() => {
            await wait(0);
        });

        const element = container.getElementsByClassName('jobs-list');

        expect(element.length).toBe(1);
    })
})