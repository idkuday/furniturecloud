# Furtiture Cloud

Capstone Project

## Decsription

This project is an ecommerce platform tailored for furniture enthusiasts, offering a user-friendly interface to browse and purchase furniture products across various categories. Users can explore the catalog, add items to their wishlist or cart, and seamlessly proceed to checkout. A registration feature allows new users to easily create accounts, while existing users can log in to access personalized features such as order history and exclusive discounts.

## Key Features

**User Management:** Users can register, log in, and manage their accounts. Logged-in users gain access to features like wishlists, cart management, and order history.

**Product Catalog:** A comprehensive catalog of furniture products categorized for easy navigation and exploration.

**Wishlist and Cart:** Logged-in users can add products to their wishlist or cart for future reference or purchase.

**Order Placement:** Seamless order placement with options to view past orders.

**Discounts and Promotions:** Users can apply discount codes during checkout for special offers. Admins can manage discounts for specific users.

**Admin Panel:** Admins have access to features such as user and product management, order tracking, and setting discounts.

## Technical Details:

**Backend Infrastructure:** The backend is powered by Spring Boot, with a main application service and two microservices (reports and discount services). A service registry and API gateway facilitate seamless communication between services.

**Security:** Spring Security and JWTs are implemented to maintain a stateless application environment, ensuring secure user authentication and authorization.

**Frontend Technology:** Angular 17, complemented by Angular Material, provides a modern frontend interface for an enhanced user experience.

## How to use
### Run the Backend Services
The backend was created with JDK 17, please ensure you have installed a Java runtime.

1) Please edit the application.yaml/.yml file under src/main/resource under folders : Furniture-Cloud, DiscountService and ReportsService to change the database configuration, the'/furniturecloud' is if you are importing the database I have provided else place your database name there:
  url: <your database url >/furniturecloud
  username: <Your database username>
  password: <Your database password>

2) Create the jar file for the service using the 'mvn -DskipTests=true package' command for each of the services.
3) Run the jar files in the order, Service Registry, Store, DiscountService, ReportsService, cloud,-gateway(Api gateway).

### Run the Frontend
1) Run npm install to install node modules.
2) Install Latest Angular CLI if it isnt already intsalled
3) Run 'ng serve --open' to start the server and open a browser tab with the required link.

### To use the app
You required to be signed in to try out all the app functionalities.
Also if you have restarted the backend Store server, please ensure to logout if already logged in (since the public and private keys change in this case, and all previous jwts are now invalid).
The Admin is : admin123@fc.com, password : 1234 
You can access the admin page only if logged in as the admin.
Have fun!

