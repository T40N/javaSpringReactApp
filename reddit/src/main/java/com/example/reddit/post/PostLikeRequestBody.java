package com.example.reddit.post;

public class PostLikeRequestBody {
    private Long postId;
    private Long userId;

    public PostLikeRequestBody() {
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
