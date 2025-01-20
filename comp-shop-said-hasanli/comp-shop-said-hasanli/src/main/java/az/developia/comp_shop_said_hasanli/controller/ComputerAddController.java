package az.developia.comp_shop_said_hasanli.controller;
import az.developia.comp_shop_said_hasanli.entity.ComputerTableEntity;
import az.developia.comp_shop_said_hasanli.service.ComputerTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/computers")
public class ComputerAddController {
    @Autowired
    private ComputerTableService computerTableService;

    @GetMapping
    public List<ComputerTableEntity> getAllComputers() {
        return computerTableService.getAllComputers();
    }

    @PostMapping
    public ComputerTableEntity addComputer(@RequestBody ComputerTableEntity computer) {
        return computerTableService.saveComputerTableEntity(computer);
    }

    @DeleteMapping("/{id}")
    public void deleteComputer(@PathVariable Long id) {
        computerTableService.deleteComputerById(id);
    }
}
