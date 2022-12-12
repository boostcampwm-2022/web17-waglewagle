package com.waglewagle.rest.demo;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@ToString
@Getter
public class Mock {

    @Id
    @GeneratedValue
    @Column(name = "test_id")
    private Long id;

    private String value;
}
