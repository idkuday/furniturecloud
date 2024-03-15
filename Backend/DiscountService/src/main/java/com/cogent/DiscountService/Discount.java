package com.cogent.DiscountService;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer discountId;
    private String code;
    private Integer percent;
    
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable=false)
	private User user ;//Used for keeping User and this entity in sync

    public Discount() {
    }

    public Integer getDiscountId() {
		return discountId;
	}

	public Discount(String code, Integer percent, User user) {
		super();
		this.code = code;
		this.percent = percent;
		this.user=user;
	}

	public void setDiscountId(Integer discountId) {
		this.discountId = discountId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getPercent() {
		return percent;
	}

	public void setPercent(Integer percent) {
		this.percent = percent;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getId() {
        return discountId;
    }

    public void setId(Integer discountId) {
        this.discountId = discountId;
    }
}