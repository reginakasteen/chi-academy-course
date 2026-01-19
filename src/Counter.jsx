import React, {useState} from 'react';

const Counter = ({ initial = 0 }) => {
    const [count, setCount] = useState(initial);

    return (
        <div className="counter">
            <button onClick={() => setCount(count - 1)}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
};

export default Counter;