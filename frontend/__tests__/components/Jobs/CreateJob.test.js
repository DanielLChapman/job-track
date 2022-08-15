import {act, screen, render} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import {signedInMocks, notSignedInMocks} from '../../../Helper/GeneralMocks'
import wait from 'waait';

import { fakeJob, fakeUser } from '../../../library/testUtils';
import CreateJob, { CREATE_JOB_MUTATION } from '../../../components/Jobs/CreateJob';
import userEvent from '@testing-library/user-event';

const job = fakeJob();


const mocks = [
    ...signedInMocks,
    {
        request: {
            query: CREATE_JOB_MUTATION,
            variables: {
                name: job.name,
                status: job.status,
                author: job.author,
                salaryExpectation: job.salaryExpectation,
                notes: job.notes,
            },
        },
        result: {
            data: {
                createJob: {
                    id: job.id,
                    __typename: 'Job',
                    name: job.name
                }
            }
        }
    }
]

describe('it renders a job submit form and submits successfully', () => {
    it ('does not load unless signed in', async() => {
        const {container, debug} = render(
            <MockedProvider>
                <CreateJob />
            </MockedProvider>
        )

        await screen.findByText(
            'Please Log In'
        );

        expect(container).toMatchSnapshot();
    })

    it ('does load correctly unless signed in', async() => {
        const {container, debug} = render(
            <MockedProvider mocks={signedInMocks}>
                <CreateJob user={fakeUser()} />
            </MockedProvider>
        )

        await screen.findByText(
            'Create a new Job'
        );

        expect(container).toMatchSnapshot();
    })

    it('calls the mutation properly', async () => {
        const {container, debug} = render(
            <MockedProvider mocks={mocks}>
                <CreateJob user={fakeUser()} />
            </MockedProvider>
        )

        // Type into the boxes
        await userEvent.type(screen.getByPlaceholderText(/name/i), job.name);
        await userEvent.type(screen.getByTestId('notes'), job.notes);
      // Click the submit
        await userEvent.click(screen.getByText('Add Job'));
        await act(async () => {
          await wait(0);
        })
        
        const element = await screen.getByTestId('success-signup-message');
        expect(element);
        /*await screen.findByText(
          `Signed Up With`
        );*/
      });
})