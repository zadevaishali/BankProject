package com.servicesImpl;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.models.User;
import com.repositories.UserRepository;
import com.services.SignUpService;


@Service
public class SignUpServiceImpl implements SignUpService {

    @Autowired
    private UserRepository userRepo;

  

    @Autowired
    PasswordEncoder passwordEncoded;



    @Override
    public User createUser(User user) {

        user.setPassword(passwordEncoded.encode(user.getPassword()));

        User createdUser = userRepo.save(user);

        return createdUser;

    }


	@Override
	public Optional<User> getUser(Long userId) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}



	@Override
	public List<User> getAllUsers() {
		
		return userRepo.findAll();
	}



	@Override
	public void save(User theUser) {
		// TODO Auto-generated method stub
		
	}



	@Override
	public User findByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email);
	}



}