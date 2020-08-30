import React, { InputHTMLAttributes } from 'react';

import './styles.css';

// extende as propriedades existentes em um input HTMLInputElement
interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    name  : string;
    label : string;
}

// o ...rest recebe todas as opções que um input pode definir (HTMLInputElement)
const Input: React.FC<InputProps> = ({ label, name, ...rest }) =>
{

    return (

        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>

    );

}

export default Input;