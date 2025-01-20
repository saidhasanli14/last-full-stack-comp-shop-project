package az.developia.comp_shop_said_hasanli.controller;


import az.developia.comp_shop_said_hasanli.entity.ComputerTableEntity;
import az.developia.comp_shop_said_hasanli.repository.ComputerTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/students")
@CrossOrigin(origins = "*")
public class ComputerTableController {
    @Autowired
    private ComputerTableRepository computerTableRepository;


    @PostMapping
    public ComputerTableEntity save(@Validated @RequestBody ComputerTableEntity studentEntity, BindingResult result) {
        if(result.hasErrors()){
            try {
                throw new MyRuntimeException(result);
            } catch (MyRuntimeException e) {
                throw new MyRuntimeException(e);
            }
        }
        return computerTableRepository.save(studentEntity);
    }

    @GetMapping
    public List<ComputerTableEntity> findAll(){
        return computerTableRepository.findAll();
    }

    @DeleteMapping(path="/{id}")
    public void deleteById(@PathVariable Long id){
        computerTableRepository.deleteById(id);
        List<ComputerTableEntity> studentNotes=computerTableRepository.findAllById(id);
        computerTableRepository.deleteAll(studentNotes);
    }
    @GetMapping(path="/{id}")
    public ComputerTableEntity findById(@PathVariable Long id){
        return computerTableRepository.findById(id).get();
    }

}
