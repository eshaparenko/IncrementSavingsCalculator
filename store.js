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

export default Store;