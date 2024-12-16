package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.models.User;
import com.repositories.UserRepository;


@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User theUser = userRepository.findByEmail(username);
        
        if (theUser == null) {
            throw new UsernameNotFoundException("User with given email Not Found!");
        }

        return theUser;
    }

}