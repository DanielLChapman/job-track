import {act, screen, render} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Header from '../../components/Header';
import {signedInMocks, notSignedInMocks} from '../../Helper/GeneralMocks'
import wait from 'waait';

describe('It insures the header contains the necessary information', () => {
    it ('has a title, and two buttons when not logged in', () => {
        const { container, debug} = render(
            <MockedProvider mocks={notSignedInMocks}>
                <Header />
            </MockedProvider>
        )

        expect(container).toMatchSnapshot();
    })

    it ('renders a different header when logged in', async () => {
        const {container: container2, debug: debug2} = render(
            <MockedProvider mocks={notSignedInMocks}>
                <Header />
            </MockedProvider>
        )
        const { container, debug} = render(
            <MockedProvider mocks={notSignedInMocks}>
                <Header />
            </MockedProvider>
        )

        await act(async() => {
            await wait(0);
        });
        expect(container).toMatchSnapshot();
        expect(container).not.toBe(container2);
    })
})