package com.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exceptions.UserNotFoundException;
import com.models.User;
import com.models.UserDetail;
import com.repositories.UserRepository;
import com.services.ProfileService;


@Service
public class ProfileServiceImpl implements ProfileService{
	@Autowired
	private UserRepository userRepo;

	@Override
	public User createUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException {
		System.out.println(userDetails.getAddress());
		System.out.println(userId);
		 if (userDetails.getAdhaar() == null || userDetails.getPan() == null || userDetails.getMobile() == null) {

	            throw new UserNotFoundException("Provide mandatory fields");
	        }

		 User theUser = userRepo.findById(userId)
                 .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

	        userDetails.setUser(theUser);
	        theUser.setUserdetails(userDetails);
	        User savingUpdatedUser = userRepo.save(theUser);
	        return savingUpdatedUser;

	    }

	@Override
	public User updateUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException {
		 if (userDetails.getAdhaar() == null || userDetails.getPan() == null || userDetails.getMobile() == null) {

	            throw new UserNotFoundException("Provide mandatory fields");
	        }

	        User theUser = userRepo.findById(userId).get();
	        userDetails.setUser(theUser);
	        theUser.setUserdetails(userDetails);
	        User savingUpdatedUser = userRepo.save(theUser);
	        return savingUpdatedUser;

	    }
}
