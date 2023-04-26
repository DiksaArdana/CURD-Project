package com.api.users.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.api.users.dto.AuthResponseDto;
import com.api.users.dto.LoginDto;
import com.api.users.dto.RegisterUserDto;
import com.api.users.entity.Users;
import com.api.users.repository.UserRepository;
import com.api.users.security.JWTGenerator;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserRepository userRepo;

  @Autowired
  private JWTGenerator jwtGenerator;

  @Autowired
  private AuthenticationManager authenticationManager;

  // Login
  @PostMapping("/login")
  public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginDto.getUsername(),
            loginDto.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String token = jwtGenerator.generateToken(authentication);
    return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
  }

  // Register
  @PostMapping("/register")
  public ResponseEntity<String> addUser(@Valid @RequestBody RegisterUserDto registerDto) throws Exception {

    if (userRepo.existsByEmail(registerDto.getEmail())) {
      return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
    }
    Users user = new Users();
    user.setEmail(registerDto.getEmail());
    user.setName(registerDto.getName());
    user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
    userRepo.save(user);

    return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
  }
  
}
