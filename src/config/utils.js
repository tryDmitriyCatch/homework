export function getYearFromDateString(date) {
    if (date !== undefined) {
        return (new Date(date)).getFullYear()
    }
}