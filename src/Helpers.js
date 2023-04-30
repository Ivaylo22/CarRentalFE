export const prices = ["100", "150", "200", "250", "300"]

export function isAvailableinRange(startDate, endDate, takenDates) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
  
    for (let i = 0; i < takenDates.length; i++) {
        const takenDate = new Date(takenDates[i]).getTime();
        if (takenDate >= start && takenDate <= end) {
            return false;
        }
    }
  
    return true;
}