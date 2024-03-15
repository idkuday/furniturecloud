package com.furniturecloud.datalayer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public class Cart {
	public Map<Long, Integer> cart;

	DAO<Product, Long> products;
	
	public Cart(String mapData,boolean isOrder, DAO<Product, Long> products) {
		cart = new HashMap<>();
		parseCart(mapData,isOrder);
		this.products=products;
	}
	public String findUnavailable() {
		HashMap<Long, Integer> unavailableProducts = new HashMap<Long, Integer>();
		for(Long k : cart.keySet()) {
			if(products.get(k)!=null) {
				int stock=products.get(k).getStock();
				int quantity=cart.get(k);
				if(stock<quantity) {
					unavailableProducts.put(k, stock - quantity);
					cart.put(k, stock-quantity);
				}
				continue;
			}
			unavailableProducts.put(k, 0);
			cart.remove(k);
			
		}
		return Cart.toData(unavailableProducts);
	}
	
	
	public static String toData(HashMap<Long, Integer> cart) {
		StringBuilder data =new StringBuilder();
		for(Long id : cart.keySet()) {
			data.append(id+" "+cart.get(id)+",");
		}
		return data.toString();
	}
	public String toWishListData() {
		StringBuilder data =new StringBuilder();
		for(Long id : cart.keySet()) {
			data.append(id+" "+1+",");
		}
		return data.toString();
	}
	
	public void parseCart(String data, boolean order) {
		if(order) {
		data=removeTotal(data);
		System.out.println(data);
		}
		System.out.println("Outside"+data);
		String[] dataArray = data.split(",");
		for(String item:dataArray) {
			String arr[] =item.split(" ");
			cart.put(Long.parseLong(arr[0]),Integer.parseInt(arr[1]));
		}
	}
	public String removeTotal(String data){
		return data.substring(0,data.indexOf(":"));
	}
	public List<Product> getProducts() {
		List<Product> products= new ArrayList<Product>();
		for(Long key:cart.keySet()) {
			Product p = this.products.get(key);
			if(p.stock<cart.get(key)) {
				return null;
			}
			products.add(p);
		}
		return products;
	}
	

}
