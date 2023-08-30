use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env,
    json_types::U64,
    near_bindgen,
    serde::Serialize,
    store::Vector,
    AccountId
};

#[derive(BorshSerialize, BorshDeserialize)]
#[near_bindgen]
pub struct ChatApp {
    messages: Vector<Message>,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Message {
    id: u32,
    author: AccountId,
    block_height: U64,
    text: String,
    media: Option<String>
}

impl Default for ChatApp {
    fn default() -> Self {
        Self {
            messages: Vector::new(b"m")
        }
    }
}

#[near_bindgen]
impl ChatApp {
    #[private]
    pub fn clear(&mut self) {
        self.messages.clear();
    }

    #[payable]
    pub fn send(&mut self, text: String, media: Option<String>) {
        let id = self.messages.len();

        let message = Message {
            author: env::predecessor_account_id(),
            block_height: env::block_height().into(),
            text,
            media,
            id
        };

        self.messages.push(message);
    }

    pub fn get_messages(&self, limit: Option<u32>, offset: Option<u32>) -> Vec<&Message> {
        self.messages
            .iter()
            .rev()
            .skip(offset.unwrap_or(0) as usize)
            .take(limit.unwrap_or(10) as usize)
            .collect()
    }
}