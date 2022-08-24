import {act, screen, render} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import { fakeJob } from '../../../library/testUtils';
import JobInfo from '../../../components/Jobs/JobInfo';
import JobList from '../../../components/Jobs/JobList';

const jobs = [{...fakeJob(), id: 1234}, {...fakeJob(), id: 1244}, {...fakeJob(), id: 12234}];

describe('It insures the correct information is displayed', () => {
    it ('renders correctly when jobs are passed in', async () => {

        const { container, debug} = render(
            <MockedProvider>
                <JobList jobs={jobs} />
            </MockedProvider>
        )

        await act(async() => {
            await wait(0);
        });

        await screen.findByText(jobs[0].name);
        await screen.findByText(jobs[1].name);
        await screen.findByText(jobs[2].name);

        expect(container).toMatchSnapshot();
    })
})