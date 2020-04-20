import React from 'react';
import { motion } from "framer-motion";
import { Icon, InlineIcon } from '@iconify/react';
import pizzaIcon from '@iconify/icons-si-glyph/pizza';


const variants = {
    loadingScreen: {
        visible: {
            display: "flex"
        },
        hidden: {
            transition: { when: "afterChildren" },
            transitionEnd: { display: "none" }
        }
    },
    loadingBackground: {
        visible: {
            opacity: 0.8,
            display: "block"
        },
        hidden: {
            opacity: 0,
        }
    },
    loadingMessage: {
        visible: {
            opacity: 1,
            y: 0
        },
        hidden: {
            opacity: 0,
            y: -100
        }
    }
};

const LoadingScreen = ({ isLoading }) => {
    const loadingAnimate = isLoading ? "visible" : "hidden";
    return (
        <motion.div
            className="w-screen h-screen absolute flex items-center justify-center hidden" 
            animate={loadingAnimate}
            variants={variants.loadingScreen}
        >
            <motion.div
                className="w-screen h-screen bg-black absolute z-0"
                variants={variants.loadingBackground}
            >

            </motion.div>
            <motion.div
                className="
                text-2xl
                rounded
                bg-white
                w-48
                h-32
                opacity-100
                z-10
                shadow-2xl
                border-gray-700
                border-4
                flex
                items-center
                justify-center"
                variants={variants.loadingMessage}
            >
                <div className="text-2xl">Loading</div>
                <Icon className="ml-4 fa-spin" icon={pizzaIcon} />
            </motion.div>

        </motion.div>
    );
};

export default LoadingScreen;