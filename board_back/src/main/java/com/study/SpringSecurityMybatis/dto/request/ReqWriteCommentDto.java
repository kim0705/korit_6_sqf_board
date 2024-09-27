package com.study.SpringSecurityMybatis.dto.request;

import com.study.SpringSecurityMybatis.entity.Comment;
import lombok.Data;

@Data
public class ReqWriteCommentDto {
    private Long boardId;
    private Long parentId; // 댓글이 어디 달린건지 확인
    private String content;

    public Comment toEntity(Long writerId) {
        return Comment.builder()
                .boardId(boardId)
                .parentId(parentId)
                .content(content)
                .writerId(writerId)
                .build();
    }
}
