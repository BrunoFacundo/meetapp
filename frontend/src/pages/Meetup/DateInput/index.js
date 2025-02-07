import { useField } from '@rocketseat/unform';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container } from './styles';

export default function DateInput({ name, placeholder }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'props.selected',
            clearValue: pickerRef => {
                pickerRef.clear();
            }
        });
    }, [ref.current, fieldName]); // eslint-disable-line

    function handleChange(date) {
        setSelected(date || undefined);
    }

    return (
        <>
            <Container>
                <ReactDatePicker
                    ref={ref}
                    selected={selected}
                    placeholderText={placeholder}
                    onChange={handleChange}
                    locale={pt}
                    showTimeSelect
                    timeFormat="HH'h'"
                    timeIntervals={60}
                    timeCaption="Hora"
                    dateFormat="dd/MM/yyyy 'às' HH'h'"
                />
            </Container>
            {error && <span>{error}</span>}
        </>
    );
}

DateInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

DateInput.defaultProps = {
    placeholder: ''
};
