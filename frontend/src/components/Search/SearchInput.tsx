import React,{ useState, useEffect, KeyboardEvent } from 'react';
import { Redirect } from 'react-router';
import { search } from '../../redux/actions/products';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers/index';

interface LinkStateToProps {
    token: string
}

interface Dispatches {
    search: (arg: string) => void
}

const SearchInput: React.FC<LinkStateToProps & Dispatches> = (props) => {
    const [value,setValue] = useState<string>('');
    const [redirect,setRedirect] = useState<boolean>(false);

    useEffect(() => {
        setRedirect(false);
    },[redirect]);

    const search = async (e: KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (e.charCode === 13) {
            props.search(value);
            setRedirect(true);
        }
    }

    if (redirect) return <Redirect to='/search' />
    return (
        <input 
            onKeyPress={search} 
            onChange={(e) => setValue(e.target.value)} 
            value={value} 
            className={`searchInput ${!props.token && 'changeLocalInput'}`} />
    )
}

export default connect(
    ({ auth }: AppState): LinkStateToProps => ({ token : auth.token }),
    { search } as Dispatches
)(SearchInput);