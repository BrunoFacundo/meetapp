import React, { forwardRef } from 'react';
import { TextInput } from './styles';

function Input(props, ref) {
    return <TextInput ref={ref} {...props} />;
}

export default forwardRef(Input);
