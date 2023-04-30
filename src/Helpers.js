export const prices = ["100", "150", "200", "250", "300"]

export function isAvailableInRange(startDate, endDate, takenDates) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if(start === null || end === null ){
        return true;
    }

    for (let i = 0; i < takenDates.length; i++) {
        const takenDate = new Date(takenDates[i]).getTime();
        if (takenDate >= start && takenDate <= end) {
            return false;
        }
    }
  
    return true;
}