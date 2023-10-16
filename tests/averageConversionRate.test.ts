import { expect, test } from '@playwright/test';
import { Series } from '../api/observations/bySeries';

const seriesName = 'FXCADAUD';
let observation: Series;

test.beforeAll(async ({ playwright }) => {
    observation = new Series();
  });

test.describe.configure({ mode: 'parallel' });
test('/valet/observations/ should find the average Forex conversion rate "CAD to AUD" for the recent 10 weeks', async({ request }) => {
    const response = await request.get(observation.getAverageRateByWeeksURL(seriesName, '10'));

    // Assert response status code
    expect(response.status(), 'Response status code is not 200').toEqual(200);

    // Get response text content
    const responseBody = JSON.parse(await response.text())

    // Assert response URL
    expect(responseBody.terms.url, 'Response comes from uexpected URL').toEqual('https://www.bankofcanada.ca/terms/');

    // Assert series detail lable
    expect(responseBody.seriesDetail.FXCADAUD.label, 'Unexpected series detail lable in response').toEqual('CAD/AUD');

    let sum = 0;
    let numberOfDays = responseBody.observations.length;

    responseBody.observations.forEach((observation: { FXCADAUD: { v: number; }; }) => {
        sum = sum + Number(observation.FXCADAUD.v);
    });

    // Assert average conversion rate greater than 0
    expect(sum/numberOfDays).toBeGreaterThan(0);

    // Log result in console
    console.log('The average Forex conversion rate "CAD to AUD" for the recent 10 weeks is ' + sum / numberOfDays);
})

test('/valet/observations/ should not throw error on missing number of weeks parameter', async({ request }) => {
    const response = await request.get(observation.getAverageRateByWeeksURL(seriesName));

    // Assert response status code
    expect(response.status(), 'Response status code is not 200').toEqual(200);
})

test('/valet/observations/ should throw 404 error when passing invalid series name parameter', async({ request }) => {
    const invalidSeriesName = 'FXYYYZZZ';
    const response = await request.get(observation.getAverageRateByWeeksURL(invalidSeriesName, '10'));

    // Assert response status is not Ok
    await expect(response).not.toBeOK();

    // Assert response status code to be 400
    expect(response.status(), '404 error not thrown').toEqual(404);

    const responseBody = JSON.parse(await response.text());
    let errorMessage = responseBody.message;

    // Assert error message
    expect(errorMessage).toEqual(`Series ${invalidSeriesName} not found.`);
})

test('/valet/observations/ should throw 400 error when passing string parameter into number of weeks', async({ request }) => {
    const response = await request.get(observation.getAverageRateByWeeksURL(seriesName, 'ABCDEF'));

    // Get response text content
    const responseBody = JSON.parse(await response.text());
    let errorMessage = responseBody.message;

    // Assert request status code
    expect(response.status(), '400 error was not thrown').toEqual(400);

    // Assert request parameters format
    expect(responseBody.message, 'Incorrect error messagte thrown').toEqual('Bad recent observations request parameters, must be numeric');
})

test('/valet/observations/ should throw 400 error when passing recent value that is less than one', async({ request }) => {
    const response = await request.get(observation.getAverageRateByWeeksURL(seriesName, '0'));

    // Get response text content
    const responseBody = JSON.parse(await response.text());
    let errorMessage = responseBody.message;

    // Assert request status code
    expect(response.status(), '400 error was not thrown').toEqual(400);

    // Assert request parameters format
    expect(responseBody.message, 'Incorrect error messagte thrown').toEqual('Bad recent observations request parameters, you cannot have a recent value less than one');
})
