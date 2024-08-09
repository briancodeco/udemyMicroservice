package br.com.curso.product.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/teste")
public class tesController {

    @GetMapping
    public String teste(){
        return "teste";
    }
}
