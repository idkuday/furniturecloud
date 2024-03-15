package com.furniturecloud.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.furniturecloud.datalayer.Cart;
import com.furniturecloud.datalayer.OrderRepository;
import com.furniturecloud.datalayer.Orders;
import com.furniturecloud.datalayer.Product;
import com.furniturecloud.datalayer.ProductRepository;

import jakarta.transaction.Transactional;
@Transactional
@Service
public class OrdersService {
	@Autowired
	OrderRepository orderRepo;
	@Autowired
	ProductRepository productRepo;
	public boolean placeOrder(Orders o){
		Cart c = new Cart(o.getCart(), true, productRepo);
		List<Product> products = c.getProducts();
		if(products==null)
			return false;
		for(Product p:products) {
			p.setStock(p.getStock()-c.cart.get(p.getSKU()));
			productRepo.update(p);
		}
		orderRepo.create(o);
		return true;
	}

}
