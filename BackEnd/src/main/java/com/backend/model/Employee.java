package com.backend.model;

import lombok.Data;

import javax.persistence.*;



@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nameEmployee;
    private String code;
    private int age;
    private double salary;
    @ManyToOne
    private Branch branch;

}
