import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const CustomCategorySelectFieldMaybe = props => {
  const { name, id, options, intl, placeholder } = props;
  const levelRequired = required(props.requiredMessage);
  return options ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={props.label}
      validate={levelRequired}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {options.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomCategorySelectFieldMaybe;
