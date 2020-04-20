const pizzaDocUrl = 'http://files.olo.com/pizzas.json';

// helper functions
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const map = fn => xs => xs.map(fn);
const reduce = fn => init => xs => xs.reduce(fn, init);
const toArray = obj => (Array.isArray(obj) ? obj : Object.entries(obj));
const sort = fn => xs => xs.sort(fn);
const objValueWithDefault = key => obj => d => obj[key] ? obj[key] : d;
const slice = start => count => xs => xs.slice(start, count);
const log = msg => x => (console.log(msg, x), x);

// pizza helper functions
const createPizza = toppings => ({ key: createPizzaKey(toppings), toppings: toppings, total: 0 });
const createPizzaKey = toppings => toppings.toString();
const sortToppings = toppings => toppings.sort();
const updatePizzaCount = acc => pizza => ({ ...pizza, "total": objValueWithDefault(pizza.key)(acc)(pizza).total + 1 });
const accumulatePizzaCount = acc => pizza => ({ ...acc, [pizza.key]: updatePizzaCount(acc)(pizza) });
const sortPizzasByTotal = pizzas => sort((a, b) => b.total - a.total)(pizzas);

const loadPizzas = () => {
    fetch(pizzaDocUrl)
        .then(response => {
            return response.ok
                ? response.json()
                : (() => { throw Error('There was an Error!') })()
        })
        .then(data => postMessage(processResults(data)))
        .catch(e => {
            console.log(e.message);
            // setLoading(false);
            // addNotification({ id: timestamp, message: e.message });
        });
};

const processResult = (acc, result) => pipe(
    sortToppings, // Sort the toppings on each pizza for consistency
    createPizza, // Create a new pizza object from the toppings
    accumulatePizzaCount(acc) // Update the pizza count for what we have accumulated so far
)(result.toppings);

const processResults = data => pipe(
    reduce(processResult)({}), // Group all pizzas together by toppings and accumulate their total
    toArray, // Convert our Record to an Array for easy sorting by total
    map(x => x[1]), // The array contains and array of [pizzaName: Pizza] - we can just flatten this to an array of Pizzas
    sortPizzasByTotal, // Sort the array of pizzas by total
    slice(0)(20), // Take the top 20 Pizzas from the pizza array
    // (ps: Pizza[]) => setPizzas(ps) // Update React state with pizza array
)(data);

loadPizzas();