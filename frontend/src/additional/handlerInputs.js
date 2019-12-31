export const handlerInputs = (e) => {
    switch (e.target.id) {
        case 'name':
            e.target.classList.remove('focusError');
            labels[0].current.removeAttribute('style');
            setData({
                ...data,
                name : e.target.value
            });
            break;
        case 'lastname':
            e.target.classList.remove('focusError');
            labels[1].current.removeAttribute('style');
            setData({
                ...data,
                lastname : e.target.value
            });
            break;
        case 'email' :
            e.target.classList.remove('focusError');
            labels[2].current.removeAttribute('style');
            setData({
                ...data,
                email : e.target.value
            });
            break;
        case 'password' :
            e.target.classList.remove('focusError');
            labels[3].current.removeAttribute('style');
            setData({
                ...data,
                password: e.target.value
            });
            break;
        case 'avatar' :
            e.target.classList.remove('focusError');
            if (!e.target.value.toLowerCase().includes('png') && 
                !e.target.value.toLowerCase().includes('jpg') && 
                !e.target.value.toLowerCase().includes('jpeg')) {
                setAlert({warning : 'error',message : 'Image format is incorrect'});
                e.target.classList.add('focusError');
            } else {
                setData({ ...data,avatar : e.target.files[0] });
            }
            break;
        default:
            break;
    }
}