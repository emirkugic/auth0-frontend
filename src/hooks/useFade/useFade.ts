import { useState, useEffect } from "react";

import { FadeProps } from "../../types";
import classes from './useFade.module.css';

const useFade = (initial: boolean): [boolean, React.Dispatch<React.SetStateAction<boolean>>, FadeProps] => {
    const [show, setShow] = useState(initial);
    const [isVisible, setVisible] = useState(show);

    useEffect(() => {
        if (show) setVisible(true);
    }, [show]);

    let fadeProps: FadeProps = {
        onAnimationEnd: () => {
            if (!show) {
                setVisible(false);
            }
        }
    };

    fadeProps.style = show
        ? { animation: `${classes.fadeIn} .4s` }
        : { animation: `${classes.fadeOut} .4s` };

    useEffect(() => {
    }, [show]);

    return [isVisible, setShow, fadeProps];
};

export default useFade;
