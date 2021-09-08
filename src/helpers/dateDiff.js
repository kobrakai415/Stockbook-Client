import { differenceInCalendarDays, differenceInHours, differenceInMinutes } from "date-fns";



const dateDiff = (date) => {
    const now = new Date()

    const actDate = new Date(date)
    const daysDiff = differenceInCalendarDays(now, actDate)
    const hoursDiff = differenceInHours(now, actDate)
    const minutesDiff = differenceInMinutes(now, actDate)

    if (daysDiff === 1) {
        return daysDiff + " day ago "
    } else if (daysDiff !== 0) {
        return daysDiff + " days ago "
    } else if (hoursDiff === 1) {
        return differenceInHours(now, actDate) + " hour ago "
    } else if (hoursDiff !== 0) {
        return differenceInHours(now, actDate) + " hours ago "
    } else if (minutesDiff !== 0) {
        return differenceInMinutes(now, actDate) + " mins ago "
    } else if (minutesDiff === 1) {
        return differenceInMinutes(now, actDate) + " min ago "
    } else {
        return "Now"
    }
}


export default dateDiff