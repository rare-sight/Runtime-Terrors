package com.Wikeels.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Wikeels.model.Post;
import com.Wikeels.repository.PostRepository;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend requests
public class WikiController {

    private final PostRepository postRepository;

    public WikiController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}
