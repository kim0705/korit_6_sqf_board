package com.study.SpringSecurityMybatis.exception;

import lombok.Getter;

public class EmailValidException extends RuntimeException  {

    @Getter
    private String email;

    public EmailValidException(String email) {
        super("이메일 인증 후 쓰셈. 재요청");
        this.email = email;
    }
}
