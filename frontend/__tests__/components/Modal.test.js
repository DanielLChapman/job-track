import {act, screen, render} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import {signedInMocks, notSignedInMocks} from '../../Helper/GeneralMocks'
import wait from 'waait';
import { fakeUser } from '../../library/testUtils';
import Modal from '../../components/Modal';
import userEvent from '@testing-library/user-event';

const user = fakeUser();

describe('It tests the accuracy of modals and switching', () => {
    it ('With no props, it displays the inner text', async () => {
        const { container, debug} = render(
            <MockedProvider >
                <Modal>
                    Find Me
                </Modal>
            </MockedProvider>
        )

        

        expect(container).toMatchSnapshot();

        expect(await screen.findByText('Find Me')).toBeVisible();
    })

    it ('With innertext props, it displays the inner text', async () => {
        const { container, debug} = render(
            <MockedProvider >
                <Modal  modalContent="innertext">
                    Find Me
                </Modal>
            </MockedProvider>
        )

        

        expect(container).toMatchSnapshot();

        expect(await screen.findByText('Find Me')).toBeVisible();
    })

    it ('With createjob props, it displays "Please Log In" without a user', async () => {
        const { container, debug} = render(
            <MockedProvider >
                <Modal  modalContent="createJob">
               
                </Modal>
            </MockedProvider>
        )

        expect(await screen.findByText('Please Log In')).toBeVisible();
    })

    it ('With createjob props, it displays the createJob form if logged in', async () => {
        const { container, debug} = render(
            <MockedProvider >
                <Modal  modalContent="createJob" user={user}>
               
                </Modal>
            </MockedProvider>
        )

        expect(await screen.findByText('Create a new Job')).toBeVisible();
    })

    it ('With classes props, it displays the inner text with className found', async () => {
        const { container, debug} = render(
            <MockedProvider >
                <Modal  modalContent="innertext" classes="find-me">
                    Find Me
                </Modal>
            </MockedProvider>
        )

        

        expect(container).toMatchSnapshot();

        expect(await screen.findByText('Find Me')).toBeVisible();

        const element = container.getElementsByClassName('find-me');

        expect(element.length).toBe(1);
    })

    it ('With signInUp props, it displays an error message if logged in', async () => {
        const { container, debug} = render(
            <MockedProvider >
                <Modal  modalContent="signInUp" user={user}>
               
                </Modal>
            </MockedProvider>
        )

        expect(await screen.findByText("You Shouldn't be here!")).toBeVisible();
    })

    it ('With signInUp props, it displays a form with switching options if not logged in', async () => {
        const { container, debug} = render(
            <MockedProvider >
                <Modal  modalContent="signInUp">
               
                </Modal>
            </MockedProvider>
        )

        expect(await screen.findAllByText("Sign In")).toBeInTheDocument;

        const element = container.getElementsByClassName('sign-in-up-selector-button');

        expect(element.length).toBe(1);
    })

    it ('With signInUp props, it switches forms on clicks', async () => {
        const { container, debug} = render(
            <MockedProvider >
                <Modal  modalContent="signInUp">
               
                </Modal>
            </MockedProvider>
        )

        await userEvent.click(screen.getByText('Sign Up'));
        await act(async () => {
            await wait(0);
        })

        expect(await screen.findAllByText("Sign Up")).toBeInTheDocument;
    })


})