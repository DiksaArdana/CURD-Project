package com.api.users.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.api.users.entity.Users;
import com.api.users.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository userRepo;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    Users user = userRepo.findByEmail(email);

    if (user == null) {
      throw new UsernameNotFoundException("Invalid username or password");
    }

    return new CustomUserDetails(user);
  }
}
