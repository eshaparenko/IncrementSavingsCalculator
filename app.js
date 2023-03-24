const startDate = document.getElementById('start-date')
const todayDate = document.getElementById('today')
const lastPayedDate = document.getElementById('last-payed-date')
const lastPayedAmount = document.getElementById('last-payed-amount')
const debtDays = document.getElementById('debt-days')
const todayToPayAmount = document.getElementById('today-to-pay')
const sumToPayAmount = document.getElementById('sum-to-pay')
const planedSavingsAmount = document.getElementById('planed-savings')
const card = document.getElementById('card')
const heading = document.getElementById('heading')
const loading = document.getElementById('loading')
const results = document.getElementById('results')
const form = document.getElementById('loan-form')
const msInDay = 1000*60*60*24;

document.addEventListener('DOMContentLoaded', () => {
    startDate.value = Store.getDates().startDate;
    lastPayedDate.value = Store.getDates().lastPayedDate;
    todayDate.value = new Date().toISOString().split('T')[0];
    // lastPayedDate.value = '2023-03-24';
})



form.addEventListener('submit', (e) => {
    lastPayedDate.setAttribute('min', startDate.value);
    lastPayedDate.setAttribute('max', todayDate.value)

    const dates = new Dates(startDate.value, todayDate.value, lastPayedDate.value);
    Store.addDates(dates);
    results.style.display = 'none'
    loading.style.display = 'block'
    setTimeout(calculateResults, 1000)
    e.preventDefault()
})

function calculateResults() {(startDate.value, todayDate.value, lastPayedDate.value);
    const utils = new CalcUtils(Store.getDates().startDate, Store.getDates().today, Store.getDates().lastPayedDate);
    lastPayedAmount.value = utils.getLastPayedAmount();
    debtDays.value = utils.getDeptDays();
    todayToPayAmount.value = utils.getTodayTopayAmount();
    sumToPayAmount.value = utils.getSumTopayAmount();
    planedSavingsAmount.value = utils.getProgressionSum();
    
    results.style.display = 'block'
    loading.style.display = 'none'
}

class Dates {
    constructor(startDate, today, lastPayedDate) {
        this.startDate = startDate;
        this.today = today;
        this.lastPayedDate = lastPayedDate;
    }
}

class CalcUtils {
    constructor(startDate, today, lastPayedDate) {
        this.start = startDate;
        this.today = today;
        this.last = lastPayedDate;
    }

    calcDay(startDay, endDay) {
        const start = new Date(startDay);
        const end = new Date(endDay);
        const diffMs = end - start;
        return Math.round(diffMs/msInDay);
    }

    getProgressionSum() {
        return this.calcDay(this.start, this.today)/2*(1+this.calcDay(this.start, this.today));
    }

    getDeptDays() {
        return this.calcDay(this.last, this.today)
    }

    getLastPayedAmount() {
        return this.calcDay(this.start, this.last)
    }

    getTodayTopayAmount() {
        return this.calcDay(this.start, this.today)
    }

    getSumTopayAmount() {
        return this.getDeptDays()/2*(this.getLastPayedAmount() + 1 + this.getTodayTopayAmount())
    }
}

class Store {
    static getDates() {
        let dates;
        if (localStorage.getItem('dates') === null) {
            dates = [];
        } else {
            dates = JSON.parse(localStorage.getItem('dates'))
        }
        return dates;
    }

    static addDates(dates) {
        localStorage.setItem('dates', JSON.stringify(dates))
    }
}
