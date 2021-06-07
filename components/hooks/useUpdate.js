import React, { useRef, useEffect } from 'react';

//hooks

export default function useUpdate(callback, dependecies) {

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            callback();
        }
    }, [dependecies]);

};