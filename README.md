**Deals API**
----

###**Set up project**



**1. Run docker project**
```
 $  sudo docker-compose up -d
```
**2. Run test**
```
 $  docker exec -it test_web_1 env PORT=43044 npm test
```

**3. Test user credentials**
```
 test test
```


###**API**


* **`GET` /auth/register** 

    Register new user
    
* **`GET` /auth/login** 

    Login user

* **`GET` /deals** 

    Show UI for current user deals

* **`GET` /api/v1/deals** 

    Returns current user deals

* **`GET` /api/v1/deals/:id** 

    Returns negotiations of selected deal.


* **`POST` /api/v1/deals** 

    Create new deal.
    *Example:*
    ```
    {product_id: '1', uid2: 2}
    ```
    
* **`POST` /api/v1/deals/:id** 

    Add new proposal to deal.
    *Example:*
    ```
    {message: 'I can sell you a bicycle at 100$', price: 100}
    ``` 
