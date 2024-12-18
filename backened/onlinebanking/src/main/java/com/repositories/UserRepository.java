package com.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.models.User;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
	 public User findByEmail(String email);

	public Optional<User> findById(String userId);
}
