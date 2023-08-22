
// parses time in seconds and return a crontab representing
// the interval of each jobs
const parseTime = (timeInSeconds: number) => {
    
    // run every minute
    if (timeInSeconds < 60) return `* * * * *`

    // run every certain number of minutes
    if (timeInSeconds <= 3600) {
        
        const minutes = Math.floor(timeInSeconds / 60); 

        return `*/${minutes} * * * *`
    }

    // run every certain number of hours
    if (timeInSeconds <= 86400) {

        const hours = Math.floor(timeInSeconds / 3600);

        return `0 */${hours} * * *`
    }

    return "*/10 * * * *"
}

export default parseTime;