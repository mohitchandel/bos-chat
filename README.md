# Bos ChatApp

Welcome to the Bos ChatApp, a smart contract built on the NEAR Protocol that powers a simple yet effective chatting functionality. Users can send messages and retrieve a list of messages in a convenient chat-like format. The contract is implemented in Rust using the NEAR SDK and utilises JSX for building BOS widgets to provide an decentralized user experience.

## Smart Contract Overview

The heart of this project is the "ChatApp" contract. This contract has been meticulously designed to enable seamless messaging interactions among users. It utilizes the NEAR storage vector to efficiently store messages. Each message includes essential details such as:

- Author's account ID
- Block height at which the message was sent
- A unique identifier
- The message text itself
- An optional media identifier (feat. IPFS)

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
pub struct ChatApp {
    messages: Vector<Message>,
}

// ... (More code for structs, methods, and traits)

#[near_bindgen]
impl ChatApp {
    // ... (Contract methods)
}
```

## BOS Widgets

To provide an intuitive user interface for interacting with the "ChatApp" contract, we'll be using BOS widgets built on JSX. JSX allows us to create dynamic and responsive components that complement the NEAR smart contract.
