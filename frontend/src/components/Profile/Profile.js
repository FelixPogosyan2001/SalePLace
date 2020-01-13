import React,{useState,useEffect} from 'react';
import Settings from '../Profile/Settings';
import ProfileInfo from '../Profile/ProfileInfo';
import CreatedProducts from '../Profile/CreatedProducts';
import ProfileContext from '../../context/profile';
import {connect} from 'react-redux';
import {getUser,editUser} from '../../redux/actions/user';

const Profile = ({getUser,user,edit}) => {
    const [page,setPage] = useState('Profile');

    useEffect(() => {   
       getUser();
    },[]);

    return (
        <div className="profile">
            <div className="profile__interactive">
                <h1 className="profile__interactive__title">Private office</h1>
                <menu className="profile__interactive__menu">
                    <li className={page == 'Profile' ? 'active' : ''} onClick={(e) => setPage(e.target.textContent)} >Profile</li>
                    <li className={page == 'Settings' ? 'active' : ''} onClick={(e) => setPage(e.target.textContent)} >Settings</li>
                    <li className={page == 'My products' ? 'active' : ''} onClick={(e) => setPage(e.target.textContent)} >My products</li>
                </menu>
            </div>
            <div className="profile__content">
                <ProfileContext.Provider value={{user,edit}} >
                    {page == 'Profile' ? <ProfileInfo /> : page == 'Settings' ? <Settings /> : <CreatedProducts />}
                </ProfileContext.Provider>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.profile
    }
}

export default connect(mapStateToProps,{getUser,edit : editUser})(Profile)