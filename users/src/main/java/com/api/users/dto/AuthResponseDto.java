package com.api.users.dto;

public class AuthResponseDto {
	private long idUser;
	  private String accessToken;
	  private String tokenType = "Bearer ";

	  public AuthResponseDto(String accessToken) {
	    this.accessToken = accessToken;
	  }


	public long getIdUser() {
		return idUser;
	}


	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}


	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getTokenType() {
		return tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}
	  
}
