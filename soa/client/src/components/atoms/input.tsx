import React from 'react';
import cn from 'classnames';
import './input.scss';

export const Input: React.FC<{type: 'data' | 'number' | 'password' | 'text',
size: 'small' | 'medium' | 'large', placeholder: string, name: string, id: string, error: string}> = ({type, size, id, placeholder, name, error, ...props}) => {
    return(
        <input type={type} name={name} className={cn('constructor__input', `constructor__input_${size}`,
        {'constructor__input_error':error})}
        placeholder={placeholder} id={id} {...props}/>
    );
};
