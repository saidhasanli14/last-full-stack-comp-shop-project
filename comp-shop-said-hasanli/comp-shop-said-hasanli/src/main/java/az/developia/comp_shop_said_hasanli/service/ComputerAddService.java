package az.developia.comp_shop_said_hasanli.service;

import az.developia.comp_shop_said_hasanli.entity.ComputerAddEntity;
import az.developia.comp_shop_said_hasanli.repository.ComputerAddRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComputerAddService {
    @Autowired
    private ComputerAddRepository computerAddRepository;

    public List<ComputerAddEntity> getAllComputerAddEntities() {
        return computerAddRepository.findAll();
    }

    public ComputerAddEntity addComputerAddEntity(ComputerAddEntity computerAddEntity) {
        return computerAddRepository.save(computerAddEntity);
    }

    public void deleteComputerAddEntity(Long id) {
        computerAddRepository.deleteById(id);
    }
}