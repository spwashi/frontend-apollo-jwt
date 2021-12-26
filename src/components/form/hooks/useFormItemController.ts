import {useCallback, useState} from 'react';
import {ACTION_UPDATE_INDEX, FormContextState} from '../FormContext';

export function updateFormItem<T>(form: FormContextState, formKey: string, text: T) {
    form.dispatch({type: ACTION_UPDATE_INDEX, payload: {index: formKey, value: text}})
}
export function useFormItemController<T = any>(form: FormContextState, formKey: string) {
    const [localValue, setLocalValue] = useState<T | null>(null);
    const update                      =
              useCallback((text: T) => {
                  updateFormItem(form, formKey, text);
                  setLocalValue(text);
              }, [form, formKey]);
    return [localValue, update] as [T | null, (t: T) => void];
}