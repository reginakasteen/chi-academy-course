import React from 'react';
import Wrapper from './Wrapper.jsx';
import Counter from './Counter.jsx';
const App = () => {
    return (
        <Wrapper>
            <Counter initial={0}/>
            <Counter initial={10}/>
        </Wrapper>
    );
};

export default App;