package com.models;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userdetailsid;

    private String address;
    private String city;
    private String state;
    private String pin;
    private String adhaar;
    private String pan;
    private String gender;
    private String mobile;
    private String dateOfBirth;

    @OneToOne
    @JsonBackReference
    private User user;

    private int age;
}