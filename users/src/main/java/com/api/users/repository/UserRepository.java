package com.api.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.users.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

  public Users findByEmail(String email);
  Boolean existsByEmail(String email);
}