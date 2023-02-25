export class date {
    today() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = (dd + "-" + mm + "-" + yyyy).toString();

        return today;
    }

    nine_days_before_today() {
        var nine = new Date();
        var dd = String(nine.getDate() - 9).padStart(2, "0");
        var mm = String(nine.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = nine.getFullYear();

        nine = (dd + "-" + mm + "-" + yyyy).toString();
        return nine;
    }
}

export default new date();

