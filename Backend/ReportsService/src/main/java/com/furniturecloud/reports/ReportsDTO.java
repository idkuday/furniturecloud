package com.furniturecloud.reports;

import java.util.Date;
import java.util.List;

public class ReportsDTO {
	List<Orders> orders;
	Date first;
	Date last;
	public List<Orders> getOrders() {
		return orders;
	}
	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}
	public Date getFirst() {
		return first;
	}
	public void setFirst(Date first) {
		this.first = first;
	}
	public Date getLast() {
		return last;
	}
	public void setLast(Date last) {
		this.last = last;
	}
	

}
