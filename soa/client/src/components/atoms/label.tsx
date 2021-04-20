import React from 'react';
import cn from 'classnames';
import './label.scss';

export const Label: React.FC<{size: 'small' | 'medium' | 'large',
label: string, error?: string}> = ({size, label, error,...props})=>{
    return(
        <label className={cn('constructor__label',
                {'constructor__label_error':error},
                `constructor__label_${size}`)}
               {...props}>
                   {label}
        </label>
    )
}
