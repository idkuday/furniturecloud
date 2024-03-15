package com.furniturecloud.reports;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository ordersRepository;

    public List<Orders> getOrdersBetweenTimes(Date startTime, Date endTime) {
//        ReportsDTO reportsDTO = new ReportsDTO();
//        reportsDTO.setOrders(ordersRepository.findOrdersBetweenTimes(startTime, endTime));
//        reportsDTO.setFirst(startTime);
//        reportsDTO.setLast(endTime);
        return ordersRepository.findOrdersBetweenTimes(startTime, endTime);
    }
}