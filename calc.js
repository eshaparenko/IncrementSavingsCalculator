function calculateResults() {

    lastPayedAmount.value = calcDay(startDate.value, lastPayedDate.value)
    debtDays.value = Math.round((new Date(todayDate.value) - new Date(lastPayedDate.value))/msInDay);
    todayToPayAmount.value = Math.round((new Date(todayDate.value) - new Date(startDate.value))/msInDay)
    sumToPayAmount.value = debtDays.value/2*(parseInt(lastPayedAmount.value) + 1 + parseInt(todayToPayAmount.value))
    console.log(sumToPayAmount.value);
    planedSavingsAmount.value = progressionSum(startDate.value, todayDate.value)
    results.style.display = 'block'
    loading.style.display = 'none'
    //     showError('Please check your numbers')

}

function calcDay(startDay, endDay) {
    const start = new Date(startDay);
    const end = new Date(endDay);
    const diffMs = end - start;
    return Math.round(diffMs/msInDay);
}

function progressionSum(startDay, endDay) {
    return calcDay(startDay, endDay)/2*(1+calcDay(startDay, endDay));
}