export default (data: any) => {
    let available = true;

    for (let key in data) {
        if (data[key] instanceof File) continue;
        else if (!data[key].trim() && key == 'gender') {
            document.querySelectorAll('.inputRadio label').forEach(element => {
                element.classList.add('errorRadio')
            });
            available = false;
        } else if (!data[key].trim()) {
            document.getElementById(key).classList.add('focusError');
            available = false;
        }
    }

    return available;
}