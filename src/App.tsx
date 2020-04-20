import React from 'react';
import LoadingScreen from './LoadingScreen';
import { motion } from "framer-motion";

const variants = {
    list: {
        visible: {
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            }
        },
        hidden: {}
    },
    listItem: {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    }
};

const App = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);

    const loadPizzas = () => {
        setLoading(true);
        const worker = new Worker('./loadPizzas.js');
        worker.onmessage = e => {
            setPizzas(e.data);
            setLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col">
            <motion.button
                className="bg-blue-700 p-4 rounded m-4 text-white hover:bg-blue-500 w-48"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => loadPizzas()}
            >
                Load Pizzas
            </motion.button>
            <motion.ul
                className="m-4 overflow-y-scroll"
                variants={variants.list}
                initial={false}
                animate={isLoading ? "hidden" : "visible"}
            >
                {
                    pizzas.map((pizza, index) => {
                        const leftFillNum = num => targetLength => num.toString().padStart(targetLength, 0);
                        return (
                            <motion.li
                                className="flex my-2 items-center"
                                key={pizza.key}
                                variants={variants.listItem}
                            >
                                <div className="font-bold mr-4 w-20">Rank: {leftFillNum(index + 1)(2)}</div>
                                <div className="mr-4 w-64">Total Pizza's with toppings: <span className="font-bold">{pizza.total}</span></div>
                                <div className="flex items-center">
                                    Pizza Toppings: {pizza.toppings.map(topping => { 
                                        return (<div className="bg-green-500 ml-2 py-1 px-2 text-white rounded text-sm">{topping}</div>);
                                    })}
                                </div>
                            </motion.li>
                        )
                    })
                }
            </motion.ul>
            <LoadingScreen isLoading={isLoading} />
        </div>
    );
}

export default App;