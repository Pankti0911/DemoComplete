package com.synersence.hospital.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.synersence.hospital.entity.PatientCustomFieldValue;
import com.synersence.hospital.entity.PatientMaster;

public interface PatientCustomFieldValueRepository
        extends JpaRepository<PatientCustomFieldValue, Long> {

    List<PatientCustomFieldValue> findByPatient(PatientMaster patient);
}
