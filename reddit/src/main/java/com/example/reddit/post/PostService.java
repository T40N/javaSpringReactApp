package com.example.reddit.post;

import com.example.reddit.user.User;
import com.example.reddit.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Iterable<Post> getPosts(){
        return postRepository.findAll();
    }

    List<Post> getPostsByUserId(Long id){
        return postRepository.findAllByUserId(id);
    };

    public Post getPostById(long id){
        return postRepository.findById(id).get();
    }

    public String addNewPost(PostRequestBody postRequestBody){
        Post post = new Post();
        post.setTitle(postRequestBody.getTitle());
        post.setContent(postRequestBody.getContent());
        User user = userRepository.findById(postRequestBody.getUserId()).orElse(null);
        post.setUser(user);
        postRepository.save(post);
        return "Saved";
    }

    public Optional<Post> addLikeToPost(PostLikeRequestBody postLikeRequestBody){
        return postRepository.findById(postLikeRequestBody.getPostId()).map(post -> {
            if(post.likedBy(postLikeRequestBody.getUserId())){
                return postRepository.save(post);
            }else {
                post.addToLikedBy(postLikeRequestBody.getUserId());
                post.setNumberOfLikes(post.getNumberOfLikes() + 1);
                return postRepository.save(post);
            }
        });
    }

    public String deletePost(Long id) {
        postRepository.deleteById(id);
        return "Deleted";
    }

    public List<Post> searchPosts(String title){
        return postRepository.findAllByTitle(title);
    }

}
