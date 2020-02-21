import { Dispatch, MutableRefObject, ChangeEvent } from "react";

interface Params {
    id: string
    type: string
    change: Dispatch<string | object>
    data: any
}

export const useInput = ({ id, type, change, data }: Params, label: MutableRefObject<HTMLInputElement>) => {
    const focusInput = (arg: MutableRefObject<HTMLInputElement>) => arg.current.classList.add('focusInputs');
    const blurInput = (value: string, arg: MutableRefObject<HTMLInputElement>) =>  {
        if (!value) {
           arg.current.classList.remove('focusInputs');
        }
    };
    const status = typeof data != 'object';

    return {
        id,
        value: (id == 'avatar') ? '' : status ? data : data[id],
        type,
        onFocus : focusInput.bind(null, label),
        onBlur : (e: ChangeEvent<HTMLInputElement>) => blurInput(e.target.value, label), 
        onChange : (e: ChangeEvent<HTMLInputElement>) => {
            e.target.classList.remove('focusError');
            label.current.removeAttribute('style');

            if (typeof data != 'object') {
                change(e.target.value)
            } else {
                change({
                    ...data,
                    [e.target.id] : e.target.id == 'avatar' ? e.target.files[0] : e.target.value
                });
            }    
        }
    }
}