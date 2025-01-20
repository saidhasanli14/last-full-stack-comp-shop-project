package az.developia.comp_shop_said_hasanli.service;

import az.developia.comp_shop_said_hasanli.entity.ComputerTableEntity;
import az.developia.comp_shop_said_hasanli.entity.UserEntity;
import az.developia.comp_shop_said_hasanli.repository.ComputerTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComputerTableService {

    @Autowired
    private ComputerTableRepository computerRepository;

    public ComputerTableEntity saveComputerTableEntity(ComputerTableEntity computer) {
        return computerRepository.save(computer);
    }

    public List<ComputerTableEntity> getAllComputers() {
        return null;
    }

    public void deleteComputerById(Long id) {
        computerRepository.deleteById(id);
    }

    public List<ComputerTableEntity> findComputersBySeller(UserEntity user) {
        return computerRepository.findAllById(id);

    }

}



