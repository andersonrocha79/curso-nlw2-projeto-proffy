import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

// extende as propriedades existentes em um input HTMLInputElement
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>
{
    name  : string;
    label : string;
}

// o ...rest recebe todas as opções que um input pode definir (HTMLInputElement)
const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) =>
{

    return (

        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>

    );

}

export default Textarea;