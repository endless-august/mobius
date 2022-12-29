import React, { FC } from 'react';
import { DatePicker } from 'antd';

const App: FC = () => {
    return (
        <div className='App'>
            <DatePicker.TimePicker />
        </div>
    );
};

export default App;
