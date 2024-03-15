package com.furniturecloud.reports;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/reports")
@CrossOrigin("*")
public class ReportsController {
	@Autowired
    private OrderService ordersService;
   @GetMapping("/between-times")
    public ResponseEntity<?> getOrdersBetweenTimes(@RequestParam("startTime") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") Date startTime,
                                                            @RequestParam("endTime") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") Date endTime) {
//        ReportsDTO reportsDTO = ;
        return ResponseEntity.ok().body(ordersService.getOrdersBetweenTimes(startTime, endTime));
    }
	
	
}
