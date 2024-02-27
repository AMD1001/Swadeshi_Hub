package com.swadeshi.app.repositories;



import com.swadeshi.app.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository2 extends JpaRepository<User,Long> {
    User findFirstByEmail(String email);
    
}
