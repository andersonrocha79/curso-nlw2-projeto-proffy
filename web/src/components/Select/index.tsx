import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

// extende as propriedades existentes em um Select HTMLSelectElement
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>
{
    name  : string;
    label : string;
    options : Array<{
        value: string;
        label: string;
    }>;
}

// o ...rest recebe todas as opções que um Select pode definir (HTMLSelectElement)
const Select: React.FC<SelectProps> = ({ label, name, options,  ...rest }) =>
{

    return (

        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value = "" id={name} {...rest}>
                <option value="" disabled hidden>selecione uma opção</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>

    );

}

export default Select;