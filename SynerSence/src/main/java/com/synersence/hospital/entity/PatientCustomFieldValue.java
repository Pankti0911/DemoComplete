package com.synersence.hospital.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "patient_custom_field_value")
public class PatientCustomFieldValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 FK → patient_master.patient_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientMaster patient;

    // 🔗 FK → field_customization.id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_id", nullable = false)
    private FieldCustomization field;

    @Column(name = "field_value")
    private String fieldValue;

    // ===================== GETTERS & SETTERS =====================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PatientMaster getPatient() {
        return patient;
    }

    public void setPatient(PatientMaster patient) {
        this.patient = patient;
    }

    public FieldCustomization getField() {
        return field;
    }

    public void setField(FieldCustomization field) {
        this.field = field;
    }

    public String getFieldValue() {
        return fieldValue;
    }

    public void setFieldValue(String fieldValue) {
        this.fieldValue = fieldValue;
    }
}
