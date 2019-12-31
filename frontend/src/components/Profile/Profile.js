import React,{useState,useEffect} from 'react';
import Settings from '../Profile/Settings';
import ProfileInfo from '../Profile/ProfileInfo';
import CreatedProducts from '../Profile/CreatedProducts';
import ProfileContext from '../../context/profile';
import {connect} from 'react-redux';
import {getUser,editUser} from '../../redux/actions/user';
import {connectToServer} from '../../redux/actions/communication';

const Profile = ({getUser,user,edit,connectToServer}) => {
    const [page,setPage] = useState('Profile');

    useEffect(() => {   
        if (user._id && user.connection.status != 'online'){
           //connectToServer();
        } else if (!user._id) {
            getUser();
        }
    },[user]);

    return (
        <div className="profile">
            <div className="profile__interactive">
                <h1 className="profile__interactive__title">Private office</h1>
                <menu className="profile__interactive__menu">
                    <li onClick={(e) => setPage(e.target.textContent)} >Profile</li>
                    <li onClick={(e) => setPage(e.target.textContent)} >Settings</li>
                    <li onClick={(e) => setPage(e.target.textContent)} >My products</li>
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

export default connect(mapStateToProps,{getUser,edit : editUser,connectToServer})(Profile)