package com.api.users.service;

import java.util.List;

import com.api.users.entity.Users;

public interface UserService {
	 List<Users> listUser() throws Exception;

	 Users getUserById(long idUser) throws Exception;
}
