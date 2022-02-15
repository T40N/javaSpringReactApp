package com.example.reddit.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/all")
    public Iterable<Post> getPosts(){
        return postService.getPosts();
    }

    @GetMapping("/getPostsByUserId/{id}")
    public List<Post> getPostsByUserId(@PathVariable Long id){
        return postService.getPostsByUserId(id);
    }

    @GetMapping("/all/{id}")
    public Post getPostById(@PathVariable Long id){
        return postService.getPostById(id);
    }

    @GetMapping("/all/search/{title}")
    public List<Post> getSearchedPosts(@PathVariable String title){
        return postService.searchPosts(title);
    }

    @PostMapping("/add")
    public @ResponseBody String addNewPosts(@RequestBody PostRequestBody postRequestBody){
        return postService.addNewPost(postRequestBody);
    }

    @PatchMapping("/addLike")
    public @ResponseBody Optional<Post> addLikeToPost(@RequestBody PostLikeRequestBody postLikeRequestBody){
        return postService.addLikeToPost(postLikeRequestBody);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String deletePost(@PathVariable Long id){
        return postService.deletePost(id);
    }

}
