import React from 'react';

const Wrapper = ({ children }) => {
    return (
        <div className="wrapper">
            <h1>Use the buttons below to change counter values</h1>
            <div className="counters-row">
                {children}
            </div>
        </div>
    );
};

export default Wrapper;