use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod yoo {
    use super::*;

    // Instructions
    pub fn initialize_user(
        ctx: Context<InitializeUser>,
        name: String,
        age: String,
        gender: String,
        profile_url: String,
        description: String,
        country: String,
    ) -> Result<()> {
        // Your code here

        Ok(())
    }

    pub fn add_friend(
        ctx: Context<AddFriend>,
        name: String,
        age: String,
        gender: String,
        profile_url: String,
        description: String,
        country: String,
    ) -> Result<()> {
        // Your code here

        Ok(())
    }

    pub fn add_status(
        ctx: Context<AddStatus>,
        status: String,
        name: String,
        profile_url: String,
    ) -> Result<()> {
        // Your code here

        Ok(())
    }

    pub fn create_video(
        ctx: Context<CreateVideo>,
        content: String,
        user_name: String,
        description: String,
        profile_url: String,
    ) -> Result<()> {
        // Your code here

        Ok(())
    }

}

// Context
#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub user_profile: AccountInfo<'info>,
    #[account(mut)]
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub system_program: AccountInfo<'info>,
    #[account(mut)]
    pub clock: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct AddFriend<'info> {
    #[account(mut)]
    pub user_profile: AccountInfo<'info>,
    #[account(mut)]
    pub add_friend: AccountInfo<'info>,
    #[account(mut)]
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct AddStatus<'info> {
    #[account(mut)]
    pub user_profile: AccountInfo<'info>,
    #[account(mut)]
    pub status_account: AccountInfo<'info>,
    #[account(mut)]
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub system_program: AccountInfo<'info>,
    #[account(mut)]
    pub clock: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreateVideo<'info> {
    #[account(mut)]
    pub user_profile: AccountInfo<'info>,
    #[account(mut)]
    pub video_account: AccountInfo<'info>,
    #[account(mut)]
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub system_program: AccountInfo<'info>,
}

// Accounts
#[account]
pub struct UserProfile {
    pub authority: Pubkey,
    pub name: String,
    pub age: String,
    pub status_index: u8,
    pub status_count: u8,
    pub video_index: u8,
    pub gender: String,
    pub profile_url: String,
    pub wallet_address: Pubkey,
    pub total_friend: u8,
    pub country: String,
    pub description: String,
    pub init_time: i64,
}

#[account]
pub struct FriendAccount {
    pub authority: Pubkey,
    pub name: String,
    pub age: String,
    pub gender: String,
    pub profile_url: String,
    pub description: String,
    pub index: u8,
    pub country: String,
}

#[account]
pub struct StatusAccount {
    pub authority: Pubkey,
    pub status: String,
    pub name: String,
    pub profile_url: String,
    pub status_index: u8,
    pub init_time: i64,
}

#[account]
pub struct VideoAccount {
    pub authority: Pubkey,
    pub content: String,
    pub user_name: String,
    pub description: String,
    pub video_index: u8,
    pub profile_url: String,
}

// Additional structures
// Events
// Errors
#[error_code]
pub enum ErrorCode {
}
