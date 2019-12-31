import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router';
import {search} from '../../redux/actions/products';
import {connect} from 'react-redux';

const SearchInput = (props) => {
    const [value,setValue] = useState('');
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        setRedirect(false);
    },[redirect]);

    const search = async (e) => {
        if (e.charCode === 13) {
            props.search(value);
            setRedirect(true);
        }
    }

    if (redirect) return <Redirect to='/search' />
    return (
        <input onKeyPress={search} onChange={(e) => setValue(e.target.value)} value={value} className='searchInput'/>
    )
}

export default connect(null,{search})(SearchInput);