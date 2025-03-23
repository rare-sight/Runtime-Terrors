package com.Wikeels.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String sourceUrl;
    private int likes;  // ✅ Added likes field

    // Constructors
    public Post() {}

    public Post(String title, String content, String sourceUrl, int likes) {
        this.title = title;
        this.content = content;
        this.sourceUrl = sourceUrl;
        this.likes = likes;  // ✅ Initialize likes
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public String getSourceUrl() { return sourceUrl; }
    public int getLikes() { return likes; }  // ✅ Added getter

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setContent(String content) { this.content = content; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }
    public void setLikes(int likes) { this.likes = likes; }  // ✅ Added setter
}
