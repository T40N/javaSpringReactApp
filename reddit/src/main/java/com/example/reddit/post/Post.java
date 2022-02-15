package com.example.reddit.post;



import com.example.reddit.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String content;
    private int numberOfLikes;

    @ElementCollection
    private List<Long> LikedBy;

    public boolean likedBy(Long id){
        return LikedBy.contains(id);
    }

    public List<Long> getLikedBy() {
        return LikedBy;
    }

    public void addToLikedBy(Long id){
        LikedBy.add(id);
    }

    public void setLikedBy(List<Long> likedBy) {
        LikedBy = likedBy;
    }

    @ManyToOne(
            cascade = CascadeType.DETACH
    )
    private User user;

    public Post() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getNumberOfLikes() {
        return numberOfLikes;
    }

    public void setNumberOfLikes(int numberOfLikes) {
        this.numberOfLikes = numberOfLikes;
    }
}
