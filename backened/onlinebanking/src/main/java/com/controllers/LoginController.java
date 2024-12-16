package com.controllers;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exceptions.BadApiRequestException;
import com.models.User;
import com.requestresponse.LoginRequest;
import com.requestresponse.LoginResponse;
import com.services.LoginService;
import com.utilities.JwtUtil;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

    	System.out.println(request);
        this.doAuthenticate(request.getEmail(), request.getPassword());

        User user = (User) userDetailsService.loadUserByUsername(request.getEmail());

        String token = this.jwtUtil.generateToken(user);

        user.setPassword(null);

        LoginResponse response = LoginResponse.builder()
                .jwtToken(token)
                .user(user).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
            }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);

        try {

            manager.authenticate(authentication);

        } catch (BadCredentialsException e) {
            throw new BadApiRequestException(" Invalid Username or Password  !!");
        } catch (Exception e) {

            e.printStackTrace();
        }

    }

}
