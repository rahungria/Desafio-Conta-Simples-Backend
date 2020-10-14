# Desafio Conta Simples

[Descrição do Desafio](https://gitlab.com/desafio-conta-simples/developer#backend)

  

Repositório contendo todo o código de backend para o desafio acima.

Conterá instruções de uso e conexão, assim que for relevante.

  > **default user:**
  > username: *root*
  > password: *root*

  ## Implemented Endpoints
>  ### Authentication
>>
>>   **POST /api/auth/login**
>>  post login information to get a JsonWebToken httponly cookie to authenticate user
>
>> **POST /api/auth/signup**
>> post user info to create new user
>> - requires authentication
>
>  ### Accounts
>
>> **POST /api/account**
>> post new account info to create new account
>> - requires authentication
>
>> **GET /api/account/:id/saldo**
>> receives *id* of an account and tries to fetch the balance of the account
>> - requires *account id* in url params
>> - requires authentication
>
> ### Statements
> 
>> **POST /api/statements**
>> post an array of statements and saves to the DB
>> - requires authentication
>
>> **GET /api/statements/:accountID**
>>> ***Query Params:***
>>> + *paymentType:*
>>> 		+ *"credit"*
>>> 		+ *"debit"*
>>> + *sortByDate:*
>>> 		+ *"true"*
>>
>> receives an *accountID* and fetches the full statement, filtered by: *paymentType* and sorted by: *date of emission*
>> + requires authentication