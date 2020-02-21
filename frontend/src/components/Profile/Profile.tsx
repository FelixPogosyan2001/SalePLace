import React,{ useState, useEffect, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { getUser, editUser } from '../../redux/actions/user';
import Settings from '../Profile/Settings';
import ProfileInfo from '../Profile/ProfileInfo';
import CreatedProducts from '../Profile/CreatedProducts';
import ProfileContext from '../../context/profile';
import { AppState } from '../../redux/reducers';

interface LinkDispatchesToProps {
    getUser: () => void
    edit: (arg: object) => void
}

interface LinkStateToProps {
    user: ReturnType<typeof mapStateToProps>
}

type ProfileProps = LinkStateToProps & LinkDispatchesToProps

const Profile: React.FC<ProfileProps> = ({ getUser, user, edit }) => {
    const [page,setPage] = useState<string>('Profile');

    useEffect(() => {   
       getUser();
    },[]);

    return (
        <div className="profile">
            <div className="profile__interactive">
                <h1 className="profile__interactive__title">Private office</h1>
                <menu className="profile__interactive__menu">
                    <li className={page == 'Profile' ? 'active' : ''} onClick={(e: MouseEvent<HTMLLIElement>) => setPage((e.target as HTMLElement).textContent)} >Profile</li>
                    <li className={page == 'Settings' ? 'active' : ''} onClick={(e: MouseEvent<HTMLLIElement>) => setPage((e.target as HTMLElement).textContent)} >Settings</li>
                    <li className={page == 'My products' ? 'active' : ''} onClick={(e: MouseEvent<HTMLLIElement>) => setPage((e.target as HTMLElement).textContent)} >My products</li>
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

const mapStateToProps = (state: AppState): object => ({
    user : state.profile
})

export default connect(mapStateToProps,{ getUser, edit: editUser })(Profile);