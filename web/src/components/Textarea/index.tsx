import React, {TextareaHTMLAttributes} from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   name: string;
   label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
   return(
      <div className="textarea-block">
         <label htmlFor={name}>{label}</label>
         <textarea id={name} {...rest} />
      </div>
   );
}

export default Textarea;

// extends TextareaHTMLAttributes<HTMLTextareaElement>
// e ...rest
// são uma maneira receber qualquer type de dado no Textarea