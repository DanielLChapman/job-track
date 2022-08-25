import {act, screen, render} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import { fakeJob } from '../../../library/testUtils';
import JobView from '../../../components/Jobs/JobView';
import userEvent from '@testing-library/user-event';
const job = fakeJob();


describe('It insures the correct information is displayed', () => {
    it ('renders correctly when a job is passed in', async () => {

        const { container, debug} = render(
            <MockedProvider>
                <JobView job={job} />
            </MockedProvider>
        )

        await act(async() => {
            await wait(0);
        }); 

        expect(container).toMatchSnapshot();

        const element = await screen.getByTestId('job-block');
        expect(element);
        await screen.findByText(job.status);
        await userEvent.click(screen.getByText(job.status));

        await act(async() => {
            await wait(0);
        }); 

        await screen.findByText('Status');
        
        
    })

    it ('renders correctly when a job is passed in', async () => {

        const { container, debug} = render(
            <MockedProvider>
                <JobView job={job} />
            </MockedProvider>
        )

        await act(async() => {
            await wait(0);
        }); 

        const element = await screen.getByTestId('job-block');
        expect(element);

        await screen.findByText('⇩');
        await userEvent.click(screen.getByText('⇩'));

        await act(async() => {
            await wait(0);
        }); 

        await screen.findByText('Edit');

        expect(await screen.getByTestId('job-info-appear'));
        
        
    })
})