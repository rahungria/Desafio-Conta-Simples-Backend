# Desafio Conta Simples

[Descrição do Desafio](https://gitlab.com/desafio-conta-simples/developer#backend)

Repositório contendo todo o código de backend para o desafio acima.
Conterá instruções de uso e conexão, assim que for relevante.


## default users
> - username: *root*
> - password: *root*
> owns account: *1* 
  
> - username: *root2*
> - password: *root*
> owns account: *2*
  
> - username: *root3*
> - password: *root*
> owns account: *3*

  ## Implemented Endpoints
>  ### Authentication
>>
>>   **POST /api/auth/login**
>>  
>>  post login information to get a JsonWebToken httponly cookie to authenticate user
>
>> **POST /api/auth/signup**
>>  
>> post user info to create new user
>> - requires authentication
>
>  ### Accounts
> - all routes require authentication and authorization
>  
>> **POST /api/account**
>> 
>> creates new user
>
>> **GET /api/account/saldo**
>>  
>> Fetches the balance of the account logged in
>
> ### Statements
> - all routes requires authentication and authorization
>  
>> **POST /api/statements**
>> 
>> post an array of statements and saves to the DB
>  
>> **GET /api/statements**
>>> ***Query Params:***
>>> + *accountID:*
>>>     + *:accountID*
>>> + *paymentType:*
>>> 		+ *"credit"*
>>> 		+ *"debit"*
>>> + *sortByDate:*
>>> 		+ *"true"*
>>  
>> fetches all the statements from the given account, filtering and sorting according to the query params
>  
>> **GET /api/statements/last**
>> fetches the last statement of the account whose user is logged in
>> - requires authentication
>> - requires authorization
>>
>> receives an *accountID* and fetches the full statement, filtered by: *paymentType* and sorted by: *date of emission*

## Enitity Relation
![Entity Relation Diagram](/img/entity-relation.png)

## Diagrama de Classes dos Modelos
![Models Class Diagram](/img/model-ClassDiagram.png)