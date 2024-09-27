package com.study.SpringSecurityMybatis.controller;

import com.study.SpringSecurityMybatis.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class EmailValidController {

    @Autowired
    private EmailService emailService;


}
