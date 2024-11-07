package com.example.crud;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name="students")
public class Students {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id ; 
	
	@Column(name = "eng_name", nullable = true)
	public String eng_name ; 
	
	@Column(name = "email", nullable = true)
	public String email ;
	

	@Column(name = "faculty", nullable = true)
	public String faculty ;
	

	@Column(name = "type", nullable = true)
	public String type ;
	

	@Column(name = "user_name", nullable = true)
	public String user_name ;
	
	@Column(name = "password", nullable = true)
	public String password ;
}
