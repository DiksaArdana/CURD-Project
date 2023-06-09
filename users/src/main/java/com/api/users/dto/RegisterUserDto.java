package com.api.users.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RegisterUserDto {
	@Size(min = 6, message = "Password must be at least 6 characters long")
	private String password;
	private String name;
	@NotBlank(message = "Email is required")
	private String email;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	  
}
