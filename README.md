**Resident Zombie Api**
----
  _A system in the form of a RESTful API created to help us humans to survive on the Twitter Virus's pandemic._

***[FEATURE] Survivor creation***

* **URL**

  _/api/survivors_

* **Method:**
  
  _`POST`_ : Use it to register a new survivor.

* **Body**

    ```json
    {
      "name": "Pedro",
      "age": 26,
      "gender": "male",
      "lastLocation": {
        "latitude": "60.548976",
        "longitude": "34.123456"
      },
      "items": [
        {
          "id": "37652173-72cd-494e-889a-5a0f6d8ce3bf",
          "amount": 3
        },
        {
          "id": "faf8e188-abf2-444b-bdfe-6f2baba6b481",
          "amount": 2
        }
      ]
    }
    ```

* **Success Response:**
  
  _You successfully registered a new survivor in the system._

  * **Code:** 200 <br />
    **Content:**
    ```json
      {
        "id": "9866E9A5-0A0C-455C-BF5D-B59067E1C723",
        "name": "Pedro",
        "age": 26,
        "gender": "male",
        "lastLocation": "0A3AD2CC-C395-4FE3-A907-CE4897ED6FC0",
        "updatedAt": "2020-09-07T01:31:27.243Z",
        "createdAt": "2020-09-07T01:31:27.243Z",
        "items": [
            {
                "id": "37652173-72cd-494e-889a-5a0f6d8ce3bf",
                "amount": 3
            },
            {
                "id": "faf8e188-abf2-444b-bdfe-6f2baba6b481",
                "amount": 2
            }
        ]
      }
    ```

***[FEATURE] Survivor's location update***

* **URL**

  _/api/survivors/{survivorId}/location_

* **Method:**
  
  _`PUT`_ : Use it to update a survivor's last location.
  
*  **URL Params**

   _You must inform the survivor id to properly update his location._

   **Required:**
 
   `id=[guid]`

* **Body**

    ```json
    {
      "latitude": "49.534976",
      "longitude": "15.123456"
    }
    ```

* **Success Response:**
  
  _You successfully updated the survivor's last location on the system._

  * **Code:** 200 <br />
    **Content:**
    ```json
      {
        "id": "E0BAD28F-6509-44DA-AF32-E203AC4E2304",
        "name": "Lucas",
        "age": 25,
        "gender": "male",
        "createdAt": "2020-09-05T19:31:08.843Z",
        "updatedAt": "2020-09-08T02:47:44.460Z",
        "lastLocation": "C65B5136-23DF-49EC-A265-C61D2C57A800"
      }
    ```
 
* **Error Response:**

  _You tried to update the survivor's last location, however it was not found any survivor on database with this id._

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
      {
        "error": "Survivor not registered!"
      }
    ```