package com.study.SpringSecurityMybatis.dto.request;

import com.study.SpringSecurityMybatis.entity.Comment;
import lombok.Data;

import java.util.concurrent.CompletionException;

@Data
public class ReqModifyCommentDto {
    private Long commentId;
    private String content;

    public Comment toEntity() {
        return Comment.builder()
                .id(commentId)
                .content(content)
                .build();
    }
}
