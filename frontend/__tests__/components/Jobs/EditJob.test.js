import {act, screen, render} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import {signedInMocks, notSignedInMocks} from '../../../Helper/GeneralMocks';
import wait from 'waait';
import { fakeJob, fakeUser } from '../../../library/testUtils';
import EditJob, {EDIT_JOB_MUTATION} from '../../../components/Jobs/EditJob';
import { CURRENT_USER_QUERY } from '../../../components/User';
import userEvent from '@testing-library/user-event';


const job = fakeJob();
const user = fakeUser();
const signedInMocks3 = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { authenticatedItem: job.author } },
    },
  ];


const mocks = [
    {
        request: {
            query: EDIT_JOB_MUTATION,
            variables: {
                name: job.name,
                status: job.status,
                id: job.id,
                salaryExpectation: job.salaryExpectation,
                notes: job.notes,
            },
        },
        result: {
            data: {
                updateJob: {
                    id: job.id,
                    __typename: 'Job',
                }
            }
        }
    },
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { authenticatedItem: job.author } },
    },
]

describe('it renders a job edit form and submits successfully', () => {
    it ('does not load unless signed in', async() => {
        const {container, debug} = render(
            <MockedProvider>
                <EditJob job={job} id={job.id} closeForm={() => {}}/>
            </MockedProvider>
        )

        await screen.findByText(
            'Please Log In'
        );

        expect(container).toMatchSnapshot();
    })

    it ('does not load unless signed in and user is the same user as the job', async() => {
        const {container, debug} = render(
            <MockedProvider mocks={signedInMocks}>
                <EditJob job={job} id={job.id} closeForm={() => {}}/>
            </MockedProvider>
        )

        await screen.findByText(
            "You Shouldn't Be Here"
        );

        expect(container).toMatchSnapshot();
    })

    it('calls the mutation properly', async () => {

        const {container, debug} = render(
            <MockedProvider mocks={mocks}>
                <EditJob job={job} id={job.id} closeForm={() => {}}/>
            </MockedProvider>
        )

        await screen.findByText(
            `Edit ${job.name}`
        );

        // Type into the boxes
        //await userEvent.type(screen.getByPlaceholderText(/name/i), "1");
        //await userEvent.type(screen.getByTestId('notes'), "2");
      // Click the submit
        await userEvent.click(screen.getByText('Edit Job'));
        await act(async () => {
          await wait(0);
        })
        
        const element = await screen.getByTestId('success-message');
        expect(element);
        /*await screen.findByText(
          `Signed Up With`
        );*/
      });

    /*
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
    })*/
})