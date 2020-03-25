import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stackoverflowprofile.scss';

interface IProfileProps{
    userId : string;
}

interface IUserData {
    user_id : string;
    profile_image : string;
    display_name : string;
    location : string;
    reputation : string;
    badge_counts : IBadgeCount;
}

interface IBadgeCount {
    gold : string;
    silver : string;
    bronze : string;
}

export function StackOverflowProfile(props : IProfileProps) {
     
    const [userState, setUserState] = useState<IUserData>();

    useEffect(() => {
        debugger;
        axios.get(`https://api.stackexchange.com/2.2/users/${props.userId}?site=stackoverflow`)
            .then((data: any) => {
                setUserState(data.data.items[0])
            });
    }, [props.userId])
    return (
        (userState && userState.user_id) ?
            <div className='stackoverflow-profile'>
                <div className="stackoverflow-icon"></div>
                <img alt="Loading..." className='profile-photo' src={userState.profile_image} />
                <div className='top'>
                    <div className='profile-info'>
                        <div className='profile-name'>{userState.display_name}</div>
                        <div className='profile-location'>{userState.location}</div>
                        <div className='profile-stats-repo'>{userState.reputation}</div>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='profile-stats-badge-gold'>{userState.badge_counts.gold}</div>
                    <div className='profile-stats-badge-silver'>{userState.badge_counts.silver}</div>
                    <div className='profile-stats-badge-bronze'>{userState.badge_counts.bronze}</div>
                </div>
            </div> :
            <div className='stackoverflow-profile-loading'><span>Loading...</span></div>

    )
}