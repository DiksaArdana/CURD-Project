package com.api.users.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.api.users.dto.UpdateUserDto;
import com.api.users.entity.Users;
import com.api.users.repository.UserRepository;
import com.api.users.service.UserService;
import com.api.users.dto.UserDto;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepo;

  @GetMapping("/list")
  public List<Users> listUser() throws Exception {
    List<Users> listUser = userService.listUser();
    return listUser;
  }

  @GetMapping("/{idUser}")
  public Users getUser(@PathVariable("idUser") long idUser) throws Exception {
    Users user = userService.getUserById(idUser);
    return user;
  }
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> getDelete(@PathVariable("id") long idUser)  {
    userRepo.deleteById(idUser);
    return new ResponseEntity<>("Delete User Successful! ",HttpStatus.OK);
  }
  @GetMapping("/me")
  public UserDto getLoginUser(Authentication authentication) {
	  Users user = userRepo.findByEmail(authentication.getName());

	      return new UserDto(user.getId(), user.getName(), user.getEmail());
  }
//edit user
  @PostMapping("/edit-user")
  public ResponseEntity<String> editUser(@RequestBody UpdateUserDto userDto ) {
 	
     Users update = userRepo.findById(userDto.getId()).get();
     update.setName(userDto.getName());
     update.setEmail(userDto.getEmail());
     userRepo.save(update);

     return new ResponseEntity<>("Post Update User Successful! ",HttpStatus.OK);
  }
}