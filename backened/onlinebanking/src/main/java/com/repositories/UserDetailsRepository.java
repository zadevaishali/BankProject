package com.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.models.User;
import com.models.UserDetail;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetail, Long> {
	
}
