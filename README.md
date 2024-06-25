# Zike 

Zike was created to be a representation of the app we all know and love nike. When i was thinking about what project i wanted to do i knew it would be nike because i love the shoes they make and I have played sports my whole life. Zike is a full stack nike clone where users can look through a bunch of products they may want to buy. Users may also log in and add whatever nike product that they enjoy to the site. Once the user creates their desired product they can also update/delete them. A user may also read and write reviews with a star rating with their opinion of the product. 


# Live Link 

https://zike.onrender.com/


# Connect with me on linked in to find out more about me!

https://www.linkedin.com/in/zacharydavwood/


## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)


# Index
[Feature List](https://github.com/Zachary-Wood/zike/wiki/Zike-Feature-List) | [DataBase Schema ](https://github.com/Zachary-Wood/zike/wiki/Zike-data-base-schema)|
[User Stores](https://github.com/Zachary-Wood/zike/wiki/Zike-User-Stories) |
[Wireframes](https://github.com/Zachary-Wood/zike/wiki/Zike-Wireframes)


# Code Snippet

![Code Snippet](../zike/react-vite/public/codesnippet.png)

## What this code does

##### When creating zike I wanted users to be able to dynamically input however many sizes they wanted for a specific product. When faced with this challenge I figured out I could do a select field where a user can select one size or all of the sizes. Above the code uses a sizes array which contains objects with a label key value pair for my handleSelect functions to use. The handleSelectAllChange uses the array and function has a event listener that listens for if the button is clicked. If the button is clicked it uses a state variable to select of the sizes which maps through the array of objects and gives back an array of all the sizes. Now for the second function which is responsible for a user selecting one unique size. This function has an event listener to see if the user clicks on a specific size, the function then checks if the item is already in the selected array and if it is not it will add it to the array and spread in the previous values. We then at the end join the array to become a string to send with the payload to be stored in the database.

# Endpoints

### Log In User
- Method: POST
- URL: `/api/auth/login`
- Body:

    ```json
    {
      "email": "zike@gmail.com",
      "password": "password"
    }
    ```

- Successful Response:
  ```json
  {
    "email": "zike@gmail.com",
    "firstname": "Zach",
    "id": 3,
    "lastname": "Wood",
    "username": "Zavvn"
    
  }
  ```

---

### Get all products
- Method: GET
- URL: `/api/products`

- Status code: 200

- Successful Response:
  ```json
  {
   {
    "products": [
        {
            "clothing_type": "Shoes",
            "created_at": "Wed, 05 Jun 2024 20:07:42 GMT",
            "description": "Ultimate comfort and support for runs. Breathable mesh upper, plush ZoomX midsole, improved rocker geometry for stability. Ideal for long-distance runners needing durability and cushioned performance.",
            "gender": "Male",
            "id": 1,
            "name": "Nike Invincible Run 3's",
            "owner_id": 4,
            "price": 190,
            "product_image": "https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/invincible-3-mens-road-running-shoes-6MqQ72+(1).png",
            "reviews": [
                {
                    "created_at": "05-06-2024",
                    "id": 1,
                    "product_id": 1,
                    "rating": 5,
                    "review": "Comfortable and stylish! Great support for running.",
                    "updated_at": "Wed, 05 Jun 2024 20:07:42 GMT",
                    "user_firstname": "Marnie",
                    "user_id": 2
                },
                {
                    "created_at": "05-06-2024",
                    "id": 2,
                    "product_id": 1,
                    "rating": 5,
                    "review": "Great for jogging, supportive and breathable.",
                    "updated_at": "Wed, 05 Jun 2024 20:07:42 GMT",
                    "user_firstname": "Bobbie",
                    "user_id": 3
                }
            ],
            "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
            "type": "Running Shoe",
            "updated_at": "Wed, 05 Jun 2024 20:07:42 GMT"
        },
    ]
    }
    
  }
  ```


### Get a product by ID
- Method: GET
- URL: `/api/products/:productId`

- Status code: 200

- Successful Response:
  ```json
  {
   
    "single product": [
        {
            "clothing_type": "Shoes",
            "created_at": "Wed, 05 Jun 2024 20:07:42 GMT",
            "description": "Ultimate comfort and support for runs. Breathable mesh upper, plush ZoomX midsole, improved rocker geometry for stability. Ideal for long-distance runners needing durability and cushioned performance.",
            "gender": "Male",
            "id": 1,
            "name": "Nike Invincible Run 3's",
            "owner_id": 4,
            "price": 190,
            "product_image": "https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/invincible-3-mens-road-running-shoes-6MqQ72+(1).png",
            "reviews": [
                {
                    "created_at": "05-06-2024",
                    "id": 1,
                    "product_id": 1,
                    "rating": 5,
                    "review": "Comfortable and stylish! Great support for running.",
                    "updated_at": "Wed, 05 Jun 2024 20:07:42 GMT",
                    "user_firstname": "Marnie",
                    "user_id": 2
                },
                {
                    "created_at": "05-06-2024",
                    "id": 2,
                    "product_id": 1,
                    "rating": 5,
                    "review": "Great for jogging, supportive and breathable.",
                    "updated_at": "Wed, 05 Jun 2024 20:07:42 GMT",
                    "user_firstname": "Bobbie",
                    "user_id": 3
                }
            ],
            "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
            "type": "Running Shoe",
            "updated_at": "Wed, 05 Jun 2024 20:07:42 GMT"
        }
    ]
    }

  ```


### Create a new product
- Method: POST
- URL: `/api/products/new`
- Status code: 201
- Body:

    ```json
    {
      "clothing_type": "Shoes",
      "created_at": "Wed, 05 Jun 2024 20:07:42 GMT",
      "description": "Ultimate comfort and support for runs. Breathable mesupper, plush ZoomX midsole, improved rocker geometry for stabilityIdeal for long-distance runners needing durability and cushioneperformance.",
      "gender": "Male",

      "name": "Nike Invincible Run 3's",
      "price": 190,
      "product_image": "https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/invincible-3-mens-road-running-shoes-6MqQ72+(1).png",
    }
    ```

- Successful Response:
  ```json
  {
    "clothing_type": "Shoes",
    "created_at": "Wed, 05 Jun 2024 20:07:42 GMT",
    "description": "Ultimate comfort and support for runs. Breathable me upper, plush ZoomX midsole, improved rocker geometry for stabilit Ideal for long-distance runners needing durability and cushion performance.",
    "gender": "Male",
    "id": 1,
    "name": "Nike Invincible Run 3's",
    "owner_id": 4,
    "price": 190,
    "product_image": "https://zike-bucketl.s3.us-east-2.amazonaws.c zike-images/invincible-3-mens-road-running-shoes-6MqQ72+(1).png",
    "reviews": [],
    "updated_at": "Tue, 11 Jun 2024 14:17:41 GMT"
    
  }
  ```

### Update an existing product by Id
- Method: PUT
- URL: `/api/products/:productId`
- Status code: 200
- Body:

    ```json
    {
      "clothing_type": "Shoes",
      "created_at": "Wed, 05 Jun 2024 20:07:42 GMT",
      "description": "Updated Description",
      "gender": "Male",

      "name": "Nike Invincible Run 3's Updated",
      "price": 190,
      "product_image": "https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/invincible-3-mens-road-running-shoes-6MqQ72+(1).png",
    }
    ```

- Successful Response:
  ```json
  {
    "clothing_type": "Shoes",
    "created_at": "Wed, 05 Jun 2024 20:07:42 GMT",
    "description": "Updated Description.",
    "gender": "Male",
    "id": 1,
    "name": "Nike Invincible Run 3's Updated",
    "owner_id": 4,
    "price": 190,
    "product_image": "https://zike-bucketl.s3.us-east-2.amazonaws.c zike-images/invincible-3-mens-road-running-shoes-6MqQ72+(1).png",
    "reviews": [],
    "updated_at": "Tue, 11 Jun 2024 14:17:41 GMT"
    
  }
  ```

### Create a new product
- Method: DELETE
- URL: `/api/products/:productId`
- Status code: 200

- Successful Response:
  ```json
  {
    "message": "Your products has been deleted"
  }
  ```

- Unauthorized response
- Status code 401
   ```json
   {
      "message": "You do not own this product"
   }
   ```


## Reviews
### Create a Review
- Method: POST
- URL: `/api/products/:productId/reviews/new`
- Body:

    ```json
    {
    "review": "Great shoe loved how it felt after a long day",
    "rating": 5
    }

    ```

- Successful Response:
  ```json
  {
   "created_at": "Tue, 11 Jun 2024 14:18:29 GMT",
   "id": 27,
   "rating": 5,
   "product_id": 10,
   "review": "Great shoe loved how it felt after a long day",
   "updated_at": "Tue, 11 Jun 2024 14:18:29 GMT",
   "user_id": 3
  }
  ```

---

### Update a Review
- Method: PUT
- URL: `/api/products/:productId/reviews/:reviewId`
- Body:

    ```json
    {
    "review": "Updated Review",
    "rating": 3
    }

    ```

- Successful Response:
  ```json
  {
   "created_at": "Tue, 11 Jun 2024 14:18:29 GMT",
   "id": 27,
   "rating": 3,
   "product_id": 10,
   "review": "Updated Review",
   "updated_at": "Tue, 11 Jun 2024 14:19:45 GMT",
   "user_id": 3
  }
  ```

---

### Delete a Review
- Method: DELETE
- URL: `/products/:productId/reviews/:reviewId`
- Body: none
- Status Code 200

- Successful Response:
  ```json
  {
    "message": "Succesfully deleted your review"
    }
  ```


  




  


