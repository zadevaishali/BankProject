package com.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.exceptions.UserNotFoundException;
import com.models.User;
import com.repositories.UserRepository;
import com.requestresponse.LoginRequest;
import com.services.LoginService;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findByEmail(LoginRequest loginReq) throws UserNotFoundException {

        User user = userRepository.findByEmail(loginReq.getEmail());

        if (user == null)
            throw new UserNotFoundException("Email does not exist");

//        if (user.isEnabled() == false)
//            throw new UserNotFoundException("Email Not Verified");
//
        boolean iscorrect = passwordEncoder.matches(loginReq.getPassword(), user.getPassword());

        if (iscorrect == false)
            throw new UserNotFoundException("Invalid credentials");
        else
            return user;

    }

}