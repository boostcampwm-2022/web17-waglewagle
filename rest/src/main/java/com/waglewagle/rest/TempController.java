package com.waglewagle.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TempController {

    @GetMapping("ping")
    @ResponseBody
    public String healthCheck() {

        return "ServerOn";
    }
}
