import {act, screen, render} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import { fakeJob } from '../../../library/testUtils';
import JobInfo from '../../../components/Jobs/JobInfo';

const job = fakeJob();

describe('It insures the correct information is displayed', () => {
    it ('renders correctly when a job is passed in', async () => {

        const { container, debug} = render(
            <MockedProvider>
                <JobInfo job={job} />
            </MockedProvider>
        )

        await act(async() => {
            await wait(0);
        });

        await screen.findByText(job.name);

        expect(container).toMatchSnapshot();
    })
})