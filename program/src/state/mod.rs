use std::io::ErrorKind;

use borsh::{maybestd::io::Error as BorshError, BorshDeserialize, BorshSerialize};
use num_derive::FromPrimitive;
use num_traits::FromPrimitive;
use serde::{Deserialize, Serialize};
use solana_program::{account_info::AccountInfo, program_error::ProgramError};

mod frequency;
mod rule_set;
mod rules;

pub use frequency::*;
pub use rule_set::*;
pub use rules::*;

use crate::{error::RuleSetError, utils::assert_owned_by};

#[derive(
    BorshSerialize,
    BorshDeserialize,
    Serialize,
    Deserialize,
    PartialEq,
    Eq,
    Debug,
    Clone,
    Hash,
    PartialOrd,
)]
pub enum Operation {
    Transfer,
    Delegate,
    SaleTransfer,
    MigrateClass,
}

#[repr(C)]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Eq, Debug, Clone, Copy, FromPrimitive)]
pub enum Key {
    Uninitialized,
    Frequency,
}

pub trait SolanaAccount: BorshDeserialize {
    fn key() -> Key;

    fn size() -> usize;

    fn is_correct_account_type(data: &[u8], data_type: Key) -> bool {
        let key: Option<Key> = Key::from_u8(data[0]);
        match key {
            Some(key) => key == data_type || key == Key::Uninitialized,
            None => false,
        }
    }

    fn pad_length(buf: &mut Vec<u8>) -> Result<(), RuleSetError> {
        let padding_length = Self::size()
            .checked_sub(buf.len())
            .ok_or(RuleSetError::NumericalOverflow)?;
        buf.extend(vec![0; padding_length]);
        Ok(())
    }

    fn safe_deserialize(mut data: &[u8]) -> Result<Self, BorshError> {
        if !Self::is_correct_account_type(data, Self::key()) {
            return Err(BorshError::new(ErrorKind::Other, "DataTypeMismatch"));
        }

        let result = Self::deserialize(&mut data)?;

        Ok(result)
    }

    fn from_account_info(a: &AccountInfo) -> Result<Self, ProgramError>
where {
        let ua = Self::safe_deserialize(&a.data.borrow_mut())
            .map_err(|_| RuleSetError::DataTypeMismatch)?;

        // Check that this is a `token-metadata` owned account.
        assert_owned_by(a, &crate::id())?;

        Ok(ua)
    }
}
