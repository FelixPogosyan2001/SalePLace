import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../redux/reducers/index';

interface LinkStateToProps {
    email: string
    name: string,
    lastname: string,
    avatar: string,
    gender: string
}

type AsideProps = LinkStateToProps;

const Aside: React.FC<AsideProps> = (props) => (
    <aside>
        <div style={{backgroundImage:`url(http://localhost:2001/${props.avatar})`}} className='info__image'/>
        <p>{props.name + ' ' + props.lastname}</p>
        <span>
            Email: {props.email}
            <br/><br/>
            Gender : {props.gender}
        </span>
    </aside>
)

const mapStateToProps = (state: AppState): LinkStateToProps => ({
    email: state.profile.email,
    name: state.profile.name,
    lastname: state.profile.lastname,
    avatar: state.profile.avatar,
    gender: state.profile.gender
})

export default connect(mapStateToProps)(Aside);