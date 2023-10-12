# Design Pattern Decisions

## Restricting Access
Certain functions are only restricted to the owner. This includes the circuit breaker and change owner functions.
By design, the other contract functions are allowed to be accessed by anyone: Anyone can store file data in the contract.

## Auto Deprecation
This is not implemented.

Function Modifiers
I have used modifiers to ensure appropriate access to the admin features of the account.





