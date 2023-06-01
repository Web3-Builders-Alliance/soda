use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod wba_vault {
    use super::*;

    // Instructions
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>) -> Result<()> {
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        Ok(())
    }

    pub fn deposit_spl(ctx: Context<DepositSpl>) -> Result<()> {
        Ok(())
    }

    pub fn withdraw_spl(ctx: Context<WithdrawSpl>) -> Result<()> {
        Ok(())
    }

}

// Context
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    pub vaultState: AccountInfo<'info>,
    #[account(mut)]
    pub vaultAuth: AccountInfo<'info>,
    #[account(mut)]
    pub vault: AccountInfo<'info>,
    #[account(mut)]
    pub systemProgram: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    pub vaultState: AccountInfo<'info>,
    #[account(mut)]
    pub vaultAuth: AccountInfo<'info>,
    #[account(mut)]
    pub vault: AccountInfo<'info>,
    #[account(mut)]
    pub systemProgram: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    pub vaultState: AccountInfo<'info>,
    #[account(mut)]
    pub vaultAuth: AccountInfo<'info>,
    #[account(mut)]
    pub vault: AccountInfo<'info>,
    #[account(mut)]
    pub systemProgram: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DepositSpl<'info> {
    #[account(mut)]
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    pub ownerAta: AccountInfo<'info>,
    #[account(mut)]
    pub vaultState: AccountInfo<'info>,
    #[account(mut)]
    pub vaultAuth: AccountInfo<'info>,
    #[account(mut)]
    pub vaultAta: AccountInfo<'info>,
    #[account(mut)]
    pub tokenMint: AccountInfo<'info>,
    #[account(mut)]
    pub tokenProgram: AccountInfo<'info>,
    #[account(mut)]
    pub associatedTokenProgram: AccountInfo<'info>,
    #[account(mut)]
    pub systemProgram: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct WithdrawSpl<'info> {
    #[account(mut)]
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    pub ownerAta: AccountInfo<'info>,
    #[account(mut)]
    pub vaultState: AccountInfo<'info>,
    #[account(mut)]
    pub vaultAuth: AccountInfo<'info>,
    #[account(mut)]
    pub vaultAta: AccountInfo<'info>,
    #[account(mut)]
    pub tokenMint: AccountInfo<'info>,
    #[account(mut)]
    pub tokenProgram: AccountInfo<'info>,
    #[account(mut)]
    pub associatedTokenProgram: AccountInfo<'info>,
    #[account(mut)]
    pub systemProgram: AccountInfo<'info>,
}

// Accounts
#[account]
pub struct Vault {
    pub owner: Pubkey,
    pub auth_bump: u8,
    pub vault_bump: u8,
    pub score: u8,
}

// Additional structures
// Events
// Errors
#[error_code]
pub enum ErrorCode {
}
