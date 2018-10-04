const dishes = {
    showData : function (responseText) {

        const data = this.response
        console.log(data)
        const name = document.querySelector('.js-data-dish-name')
        const ingredients = document.querySelector('js-data-ingredients')
        const cost = document.querySelector('.js-data-cost')
        const retail = document.querySelector('js-data-retail')
        const margin = document.querySelector('js-data-margin')

        name.textContent = data.dish_name
        // ingredients.textContent = data.ingredients
        cost.textContent = data.total_cost
        retail.textContent = data.retail_price
        margin.textContent = data.margin


    },
    getDish : function (dish)  {
        const http = new XMLHttpRequest();
        http.open("GET", '../../test data/dishes.json');
        http.responseType = "json"
        http.addEventListener("load", this.showData);
        // http.addEventListener("progress", updateProgress)
        // http.addEventListener("error", transferFailed)
        // http.addEventListener("abort", transferCancelled)
        http.send()

    }

}

dishes.getDish('dishes.json')