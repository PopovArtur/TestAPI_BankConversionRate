/**
 * Generates request URL
 * @param seriesName, series for conversion rate calculation
 * @param numberOfWeeks, time period in weeks
 */
export class Series {
    getAverageRateByWeeksURL(seriesName: string, numberOfWeeks: string = ''):string {
        return `/valet/observations/${seriesName}?recent_weeks=${numberOfWeeks}`;
    }
}