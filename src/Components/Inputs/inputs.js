// Modules
import React, { useCallback } from 'react';

//Styles
import './styles.scss'

//Constants
import {FORM_FIELDS} from 'Constants/form-fields'

function Inputs (props) {

  const {getFormFieldValue, name, onChange} =props;

  const onInputChange = useCallback((ev) => {
    onChange({ name: ev.target.name, value: ev.target.value });
  }, [onChange]);

  const onInputClear = useCallback((ev) => {
    onChange({ name: ev.target.name, value: '' });
  }, [onChange]);

  const labelField = FORM_FIELDS.formFieldLabel(name);
  const valueField = FORM_FIELDS.formFieldValue(name);

  return (
    <div className="form-row">
      <input
        type="text"
        className="form-label"
        onChange={onInputChange}
        name={labelField}
        value={getFormFieldValue(labelField)}
      />
      <div className="form-input-row">
        <input
          type="text"
          className="form-input"
          name={valueField}
          onChange={onInputChange}
          value={getFormFieldValue(valueField)}
        />
        {getFormFieldValue(valueField) && <button className="close-btn" name={valueField} onClick={onInputClear}>x</button>}
      </div>
    </div>
  )
}

export default Inputs