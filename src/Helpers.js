export const bulgarianCities = 
[
    "Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Stara Zagora",
    "Pleven", "Sliven", "Dobrich", "Shumen", "Pernik", "Haskovo", 
    "Yambol", "Pazardzhik", "Veliko Tarnovo", "Vratsa", "Gabrovo", "Asenovgrad", 
    "Vidin", "Kazanluk", "Kyustendil","Kardzhali", "Montana", "Dimitrovgrad", 
    "Targovishte", "Lovech", "Silistra", "Dupnica", "Svishtov"
]

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