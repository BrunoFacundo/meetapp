import React, { forwardRef } from 'react';
import { TextInput } from './styles';

function Input(props, ref) {
    return <TextInput {...props} ref={ref} />;
}

export default forwardRef(Input);
