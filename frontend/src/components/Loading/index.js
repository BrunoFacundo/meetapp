import React from 'react';
import { Container } from './styles';

export default function Loading({ className, color = '#f94d6a', size = 50, stroke = 3 }) {
    return (
        <Container className={className} color={color} size={size} stroke={stroke}>
            <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" />
            </svg>
        </Container>
    );
}
