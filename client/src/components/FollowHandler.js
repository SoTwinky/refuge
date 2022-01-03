import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {followUser, unfollowUser} from "../actions/user.actions";
import {isEmpty} from "../utils/Utils";

const FollowHandler = ({idToFollow}) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    };

    useEffect(() => {
        if (!isEmpty(userData.pet_following)) {
            if (userData.pet_following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
        }
    }, [userData, idToFollow]);

    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnfollow}>
                  <button className="unfollow-btn">Abonné</button>
                           <img src="./img/icons/checked.svg" alt="checked"/>
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                  <button className="follow-btn">Suivre</button>
                            <img src="./img/icons/check.svg" alt="check"/>
                </span>
            )}
        </>
    );
};

export default FollowHandler;