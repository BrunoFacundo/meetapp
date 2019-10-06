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
