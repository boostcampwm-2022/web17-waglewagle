package com.waglewagle.rest.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class DemoController {

    private final DemoRepository demoRepository;

    @GetMapping("/demo")
    @ResponseBody
    public Map<Long, String> sendDemoData() {

        List<Mock> mockList = demoRepository.findAll();
        Map<Long, String> mockMap = new HashMap<>();

        mockList.forEach(m -> mockMap.put(m.getId(), m.getValue()));

        return mockMap;
    }
}
