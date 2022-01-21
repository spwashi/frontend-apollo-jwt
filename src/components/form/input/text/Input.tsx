import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {useFormItemController} from '../../hooks/useFormItemController';
import {FormContext} from '../../context/FormContext';
import styles from '../styles/input.module.scss'
import SpwEditor from '../../../spw/SpwEditor';
import {convertFromRaw, convertToRaw, Editor, EditorState} from 'draft-js';
import {Log} from '../../../Log';

type InputParams =
    { formKey?: string }
    & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Value({
                          formKey,
                          title,
                          children,
                          placeholder,
                      }: {
    formKey: string;
    value: any;
    children?: any;
    title?: string;
    placeholder?: string
}) {
    const form                 = useContext(FormContext);
    const [localValue, update] = useFormItemController(form, formKey ?? null);
    useEffect(() => {
        // if (localValue !== value)
        //     update(value);
    }, [update, localValue]);
    const id = useMemo(() => `input--${Math.random()}`.replace('.', ''), []);

    return <>
        <div className={styles.inputWrapper}>
            <label htmlFor={id}>{title ?? placeholder}</label>
            <div className="value">
                {children}
            </div>
        </div>
    </>
}

export function Input({formKey, name, value, ...rest}: InputParams) {
    const form                          = useContext(FormContext);
    const [localValue, update]          = useFormItemController(form, formKey ?? null);
    const {type = 'text'}               = rest;
    const [editorState, setEditorState] =
              React.useState(() => {
                  try {
                      const prev = JSON.parse('' + (value ?? ''));
                      return EditorState.createWithContent(convertFromRaw(prev))
                  } catch (e) {

                  }
                  return EditorState.createEmpty();
              });

    const vref   = useRef(null);
    vref.current = localValue

    useEffect(() => {
        const curr = editorState.getCurrentContent();
        if (type !== 'rich') return;
        update(type === 'rich' ? JSON.stringify(convertToRaw(curr)) : localValue)
    }, [editorState]);
    const key = useMemo(() => Date.now(), []);
    const id  = useMemo(() => `input--${Math.random()}`.replace('.', ''), []);

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={id}>{rest.title ?? rest.placeholder}</label>
            {
                type === 'rich'
                ? <Editor
                    editorKey={key + ''}
                    placeholder={rest.placeholder}
                    onChange={setEditorState}
                    editorState={editorState}
                />
                : type === 'spw'
                  ? <SpwEditor value={localValue} onChange={val => update(val)}/>
                  : <input {...rest}
                           id={id}
                           type={type}
                           name={name}
                           value={localValue ?? ''}
                           onChange={e => update(e.target.value)}/>
            }
        </div>
    );
}
