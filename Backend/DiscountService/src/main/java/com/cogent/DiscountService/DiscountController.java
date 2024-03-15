package com.cogent.DiscountService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/Discounts")
@CrossOrigin("*")
public class DiscountController {
	@Autowired
	DiscountRepo disRep;
	@Autowired
	UserRepo urepo;
	// Missing an annotation to resolve request to User object
	// Need to decide on return values

	// Discount
	@GetMapping("/")
	public String getMethodName() {
		return "Discounts";
	}
	
	@PostMapping("/create/{id}")
	public ResponseEntity<?> createDiscount(@Valid @RequestBody Discount d,@PathVariable int id) {

			Discount disc = new Discount(d.getCode(),d.getPercent(), urepo.findById(id).get());
			disRep.save(disc);

			return ResponseEntity.status(HttpStatus.OK).body(disc);

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteDiscount(@PathVariable Integer id) {
		disRep.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Deleted");
	}

	@GetMapping("/apply/{id}/{code}")
	public ResponseEntity<?> getDiscount(@Valid @PathVariable Integer id,@PathVariable String code) {	

		List<Discount> discounts= disRep.findByUser(urepo.findById(id).get())
				.stream()
				.filter(x->x.getCode().equals(code))
				.toList();
		
		return ResponseEntity.status(HttpStatus.OK).
				body(new DiscoutDTO(discounts.size()!=0,(discounts.size()==0)?null:discounts.get(0)));
	}

}