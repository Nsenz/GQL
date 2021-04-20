import React from 'react';
import cn from 'classnames';
import './field.scss';
import { Input } from 'wix-style-react';
import { Label } from '../atoms/label';

export const FieldAtomic: React.FC<{label: string, name: string, size: 'small' | 'medium' | 'large',
type: 'data' | 'number' | 'password' | 'text', onChange: React.ChangeEventHandler<HTMLInputElement>, error?: string}> = ({label, onChange, name, size, error, type, ...props})=>{
    return(
        <div className={cn('constructor__field')}>
        <Input type={type} name={name} placeholder={`Enter ${label}`} size={size}
        id={label+new Date()+size} {...props} onChange={onChange} />
        {error && <Label label={error} size={size} error={error}/>}
        </div>
    )
}