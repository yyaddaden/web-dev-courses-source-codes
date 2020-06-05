/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.javaee_ajax.entities;

/**
 *
 * @author yacin
 */
public class Personne {
    public String nom;
    public String prenom;
    public String fonction;
    
    public Personne(String nom, String prenom, String fonction){
        this.nom = nom;
        this.prenom = prenom;
        this.fonction = fonction;
    }    
}
