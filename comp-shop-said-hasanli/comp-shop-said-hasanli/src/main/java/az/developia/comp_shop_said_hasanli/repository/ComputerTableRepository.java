package az.developia.comp_shop_said_hasanli.repository;

import az.developia.comp_shop_said_hasanli.entity.ComputerTableEntity;
import jakarta.persistence.metamodel.SingularAttribute;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface ComputerTableRepository extends JpaRepository<ComputerTableEntity, Long> {
    List<ComputerTableEntity> id(Long id);

    List<ComputerTableEntity> findAllById(Long id);

    List<ComputerTableEntity> findAllById(SingularAttribute<AbstractPersistable, Serializable> id);
}
