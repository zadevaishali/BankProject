package com.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exceptions.UserNotFoundException;
import com.models.User;
import com.models.UserDetail;
//import com.services.ProfileService;
import com.services.SignUpService;
import com.servicesImpl.ProfileServiceImpl;
import com.servicesImpl.SignUpServiceImpl;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	public SignUpServiceImpl signUpServiceImpl;
	
	@Autowired
	public ProfileServiceImpl profileServiceImpl;
	
	 @GetMapping("/users")
	    public ResponseEntity<List<User>> allUsers() {
	        
	        return ResponseEntity.ok().body(signUpServiceImpl.getAllUsers());

	    }

	    
	    @GetMapping("/user")
	    public ResponseEntity<Optional<User>> getUser(@RequestParam String userid) {

	        ResponseEntity<Optional<User>> re = null;

	        Optional<User> theUser = signUpServiceImpl.getUser(userid);

	        re = new ResponseEntity<Optional<User>>(theUser, HttpStatus.OK);

	        return re;

	    }
	    
	    @PutMapping("/createprofile/{userId}")
	    public ResponseEntity<?> createUserProfile(@RequestBody UserDetail userDetail, @PathVariable String userId)
	            throws UserNotFoundException {
	    	System.out.println(userDetail.getAddress());
	        User theUser = profileServiceImpl.createUserProfile(userDetail, userId);

	        if (theUser != null) {
	            return new ResponseEntity<User>(theUser, HttpStatus.OK);
	        } else
	            return new ResponseEntity<String>("User Not Updated!", HttpStatus.EXPECTATION_FAILED);

	    }

	    
	    @PutMapping("/updateprofile/{userId}")
	    public ResponseEntity<?> updateUserProfile(@RequestBody UserDetail userDetail, @PathVariable String userId)
	            throws UserNotFoundException {

	        User theUser = profileServiceImpl.updateUserProfile(userDetail, userId);

	        if (theUser != null) {
	            return new ResponseEntity<User>(theUser, HttpStatus.OK);
	        } else
	            return new ResponseEntity<String>("User Not Updated!", HttpStatus.EXPECTATION_FAILED);

	    }

}
