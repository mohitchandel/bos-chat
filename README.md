# Bos Chatting Contract on NEAR

Welcome to the Bos Chatting Contract, a smart contract built on the NEAR Protocol that powers a simple yet effective chatting functionality. Users can send messages and retrieve a list of messages in a convenient chat-like format. The contract is implemented in Rust using the NEAR SDK, with a React frontend to provide an engaging user experience.

## Contract Overview

The heart of this project is the "Bos Chatting Contract." This contract has been meticulously designed to enable seamless messaging interactions among users. It utilizes the NEAR storage vector to efficiently store messages. Each message includes essential details such as:

- Author's account ID
- Block height at which the message was sent
- A unique identifier
- The message text itself

## Code Example

Let's take a sneak peek at a portion of the Rust code that powers the contract:

```rust
// Import necessary modules and dependencies
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env,
    json_types::U64,
    near_bindgen,
    serde::Serialize,
    store::Vector,
    AccountId, BorshStorageKey, PanicOnDefault,
};

// Define the contract structure
#[derive(BorshSerialize, BorshDeserialize, PanicOnDefault)]
#[near_bindgen]
pub struct Contract {
    messages: Vector<Message>,
}

// ... (More code for structs, methods, and traits)

#[near_bindgen]
impl Contract {
    // ... (Contract methods)
}
```

## React Frontend

To provide an intuitive user interface for interacting with the Bos Chatting Contract, we've chosen to implement the frontend using the React framework. React allows us to create dynamic and responsive components that seamlessly interact with the NEAR blockchain.
