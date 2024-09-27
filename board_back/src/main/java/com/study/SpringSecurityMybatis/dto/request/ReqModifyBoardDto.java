package com.study.SpringSecurityMybatis.dto.request;

import com.study.SpringSecurityMybatis.entity.Board;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ReqModifyBoardDto {
    private Long boardId;
    private String title;
    private String content;

    public Board toEntity(Long userId) {
        return Board.builder()
                .id(boardId)
                .userId(userId)
                .title(title)
                .content(content)
                .build();

    }
}
