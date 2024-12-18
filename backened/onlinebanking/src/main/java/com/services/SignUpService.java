package com.services;

import java.util.List;
import java.util.Optional;

import com.models.User;

public interface SignUpService {
	
  public User createUser(User user);
  public Optional<User> getUser(String userid);
  public List<User> getAllUsers();
  public void save(User theUser);
  public User findByEmail(String email);
}
