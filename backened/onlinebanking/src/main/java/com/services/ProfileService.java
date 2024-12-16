package com.services;


import com.exceptions.UserNotFoundException;
import com.models.User;
import com.models.UserDetail;


public interface ProfileService {
    public User createUserProfile(UserDetail userDetails, Long userId) throws UserNotFoundException;

    public User updateUserProfile(UserDetail userDetails, Long userId) throws UserNotFoundException;

}