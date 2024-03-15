package com.cogent.DiscountService;

public class DiscoutDTO {
	public Boolean getValid() {
		return valid;
	}
	public void setValid(Boolean valid) {
		this.valid = valid;
	}
	public Discount getDiscount() {
		return discount;
	}
	public void setDiscount(Discount discount) {
		this.discount = discount;
	}
	private Boolean valid;
	private Discount discount;
	public DiscoutDTO(Boolean valid, Discount discount) {
		super();
		this.valid = valid;
		this.discount = discount;
	}


}
