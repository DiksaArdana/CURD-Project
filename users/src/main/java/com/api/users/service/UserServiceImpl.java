package com.api.users.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.users.entity.Users;
import com.api.users.repository.UserRepository;
@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepo;

  @Override
  public Users getUserById(long idUser) {
    Users user = userRepo.findById(idUser).get();
    return user;
  }

  @Override
  public List<Users> listUser() {
    List<Users> listUser = userRepo.findAll();
    return listUser;
  }


}
