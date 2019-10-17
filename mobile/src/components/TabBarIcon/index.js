import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TabBarIcon({ name, color }) {
    return (
        <Icon
            name={name}
            color={color}
            size={24}
            style={{
                position: 'absolute',
                top: 0
            }}
        />
    );
}
