package com.study.SpringSecurityMybatis.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Board {
    private Long id;
    private String title;
    private String content;
    private Long userId;
    private User user;
    private int viewCount;
}
