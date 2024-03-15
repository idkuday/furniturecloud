package com.furniturecloud.reports;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Orders, UUID>{
	@Query("SELECT o FROM Orders o WHERE o.createdAt BETWEEN :startTime AND :endTime")
    List<Orders> findOrdersBetweenTimes(@Param("startTime") Date startTime, @Param("endTime") Date endTime);
	
	
}
