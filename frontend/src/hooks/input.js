export const useInput = ({id,type,change,data},label) => {
    const focusInput = arg => arg.current.classList.add('focusInputs');
    const blurInput = (value,arg) =>  {
        if (!value) {
           arg.current.classList.remove('focusInputs');
        }
    };
    const status = typeof data != 'object';
    return {
        id,
        value : id == 'avatar' ? '' : status ? data : data[id],
        type,
        onBlur : (e) => blurInput(e.target.value,label),
        onFocus : focusInput.bind(this,label), 
        onChange : (e) => {
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