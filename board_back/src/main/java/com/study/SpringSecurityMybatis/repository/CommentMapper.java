package com.study.SpringSecurityMybatis.repository;

import com.study.SpringSecurityMybatis.entity.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
    int save(Comment comment);
    List<Comment> findAllByBoardId(Long boardId); // 정렬해서 가지고 오기 때문에 List사용
    int getCommentCountByBoardId(Long boardId);
    int deleteById(Long id);
    int delete(Long id);
    Comment findById(Long id);
    Comment findByParentId(Long parentId);
    int update(Comment comment);
}
