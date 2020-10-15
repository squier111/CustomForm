//Modules
import React, {useCallback, useMemo} from 'react';

//Components
import Inputs from 'Components/Inputs'
import {useFormCustomHook} from 'Reducer/form-reducer'

//Constants
import {numberInput} from 'Constants/numberInput'
import {FORM_FIELDS} from 'Constants/form-fields'
import {URL} from 'Constants/url'

//API
import {postData} from 'API/postData'

//Styles
import './styles.scss'

function FormData() {
  const indexes = useMemo(()=>{
    return (
      new Array(numberInput).fill().map((_, idx)=> idx + 1)
      )
    }, [])

  const initialValue = useMemo(()=>{
    return (indexes.reduce((acc, item) => {
      acc[FORM_FIELDS.formFieldLabel(item)] = `Custom name${item}`;
      acc[FORM_FIELDS.formFieldValue(item)] = '';
      return acc;
    }, {}))
  },[indexes])

  const { formState, getFormFieldValue, setInputField, formClear } = useFormCustomHook(initialValue);

  const onSubmit = useCallback((ev) => {
    ev.preventDefault();
    postData(URL , formState).then(()=>{
      console.log("success")
    }).catch((err)=>{
      console.log("error", err)
    })
  }, [formState]);

  const onClear = useCallback((ev) => {
    ev.preventDefault();
    formClear()
  }, [formClear]);

  return (
    <div className="App">
      <form className="form" onSubmit={onSubmit}>
        {indexes.map((id)=>{
          return(
            <Inputs
              getFormFieldValue={getFormFieldValue}
              key={id}
              name={id}
              onChange={setInputField}
            />
          )
        })}
        <div className="btn-holder">
          <div className="center">
            <input className="btn submit" type="submit" value="Submit"/>
            <button className="btn clear" onClick={onClear}>Clear form</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormData;
