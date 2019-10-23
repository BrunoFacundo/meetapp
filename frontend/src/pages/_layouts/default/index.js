import PropTypes from 'prop-types';
import React from 'react';
import Header from '~/components/Header';
import { Wrapper } from './styles';

export default function DefaultLayout({ back, children }) {
    return (
        <Wrapper>
            <Header back={back} />
            {children}
        </Wrapper>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
    back: PropTypes.bool.isRequired
};
