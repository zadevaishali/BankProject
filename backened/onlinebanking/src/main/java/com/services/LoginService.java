package com.services;

import com.exceptions.UserNotFoundException;
import com.models.User;
import com.requestresponse.LoginRequest;

public interface LoginService {
	public User findByEmail(LoginRequest loginReq) throws UserNotFoundException;
}
