package az.developia.comp_shop_said_hasanli.repository;

import az.developia.comp_shop_said_hasanli.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.*;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Spring> {
    Optional<UserEntity> findByUsername(String username);
}
