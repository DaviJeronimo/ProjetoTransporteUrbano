package school.sptech.rotasmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.sptech.rotasmart.dao.UsuarioDao;
import school.sptech.rotasmart.model.Usuario;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioDao usuarioDao;

    public UsuarioController(UsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioDao.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable UUID id) {
        Usuario usuario = usuarioDao.buscarPorId(id);
        if (usuario == null) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(usuario);
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {

        if (!EmailValido(usuario.getEmail())) {
            return ResponseEntity.status(400).body("E-mail inválido! Informe um e-mail com formato correto " +
                    "(ex: usuario@dominio.com).");
        }

        if (!SenhaValida(usuario.getSenha())) {
            return ResponseEntity.status(400)
                    .body("Senha inválida! A senha deve ter no mínimo 8 caracteres, pelo menos " +
                            "1 letra maiúscula e 1 caractere especial.");
        }

        if (usuario.getId() == null) {
            usuario.setId(UUID.randomUUID());
        }

        usuarioDao.salvar(usuario);
        return ResponseEntity.status(201).body(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuarioLogin) {
        if (usuarioLogin.getEmail() == null || usuarioLogin.getSenha() == null) {
            return ResponseEntity.status(400).body("E-mail e senha são obrigatórios!");
        }

        Usuario usuarioAutenticado = usuarioDao.autenticar(usuarioLogin.getEmail(), usuarioLogin.getSenha());

        if (usuarioAutenticado == null) {
            return ResponseEntity.status(401).body("E-mail ou senha inválidos!");
        }

        return ResponseEntity.status(200).body(usuarioAutenticado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable UUID id, @RequestBody Usuario usuario) {

        if (!EmailValido(usuario.getEmail())) {
            return ResponseEntity.status(400)
                    .body("E-mail inválido! Informe um e-mail com formato correto.");
        }

        if (!SenhaValida(usuario.getSenha())) {
            return ResponseEntity.status(400)
                    .body("Senha inválida! A senha deve ter no mínimo 8 caracteres, " +
                            "pelo menos 1 letra maiúscula e 1 caractere especial.");
        }

        int linhasAfetadas = usuarioDao.atualizar(id, usuario);

        if (linhasAfetadas == 0) {
            return ResponseEntity.status(404).build();
        }

        usuario.setId(id);
        return ResponseEntity.ok(usuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        int linhasAfetadas = usuarioDao.deletar(id);

        if (linhasAfetadas == 0) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(204).build();
    }

    private boolean EmailValido(String email) {
        if (email == null || email.isBlank()) {
            return false;
        }

        int arroba = email.indexOf("@");
        int ultimoPonto = email.lastIndexOf(".");

        if (arroba <= 0) {
            return false;
        }

        if (ultimoPonto <= arroba + 1) {
            return false;
        }

        if (ultimoPonto >= email.length() - 2) {
            return false;
        }

        return true;
    }

    private boolean SenhaValida(String senha) {
        if (senha == null || senha.length() < 8) {
            return false;
        }

        boolean temLetraMaiuscula = false;
        boolean temCaracterEspecial = false;

        for (int i = 0; i < senha.length(); i++) {
            char caracter = senha.charAt(i);

            if (Character.isUpperCase(caracter)) {
                temLetraMaiuscula = true;
            }

            if (!Character.isLetterOrDigit(caracter)) {
                temCaracterEspecial = true;
            }
        }

        return temLetraMaiuscula && temCaracterEspecial;
    }
}

