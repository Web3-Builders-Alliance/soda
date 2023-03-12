use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod deposit {
    use super::*;

    // Instructions
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn deposit_native(ctx: Context<DepositNative>) -> Result<()> {
        Ok(())
    }

    pub fn withdraw_native(ctx: Context<WithdrawNative>) -> Result<()> {
        Ok(())
    }

    pub fn deposit_spl(ctx: Context<DepositSpl>) -> Result<()> {
        Ok(())
    }

    pub fn withdraw_spl(ctx: Context<WithdrawSpl>) -> Result<()> {
        Ok(())
    }

    pub fn new_order(ctx: Context<NewOrder>) -> Result<()> {
        Ok(())
    }

    pub fn cancel_order(ctx: Context<CancelOrder>) -> Result<()> {
        Ok(())
    }

}

// Context
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub depositAccount: AccountInfo<'info>,
    #[account(mut)]
    pub pdaAuth: AccountInfo<'info>,
    #[account(mut)]
    pub depositAuth: AccountInfo<'info>,
    #[account(mut)]
    pub systemProgram: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DepositNative<'info> {
    #[account(mut)]
    pub depositAccount: AccountInfo<'info>,
    #[account(mut)]
    pub pdaAuth: AccountInfo<'info>,
    #[account(mut)]
    pub solVault: AccountInfo<'info>,
    #[account(mut)]
    pub depositAuth: AccountInfo<'info>,
    #[account(mut)]
    pub systemProgram: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct WithdrawNative<'info> {
    #[account(mut)]
    pub depositAccount: AccountInfo<'info>,
    #[account(mut)]
    pub pdaAuth: AccountInfo<'info>,
    #[account(mut)]
    pub solVault: AccountInfo<'info>,
    #[account(mut)]
    pub depositAuth: AccountInfo<'info>,
    #[account(mut)]
    pub systemProgram: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DepositSpl<'info> {
    #[account(mut)]
    pub depositAccount: AccountInfo<'info>,
    #[account(mut)]
    pub pdaAuth: AccountInfo<'info>,
    #[account(mut)]
    pub depositAuth: AccountInfo<'info>,
    #[account(mut)]
    pub toTokenAcct: AccountInfo<'info>,
    #[account(mut)]
    pub fromTokenAcct: AccountInfo<'info>,
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
    pub depositAccount: AccountInfo<'info>,
    #[account(mut)]
    pub pdaAuth: AccountInfo<'info>,
    #[account(mut)]
    pub depositAuth: AccountInfo<'info>,
    #[account(mut)]
    pub toTokenAcct: AccountInfo<'info>,
    #[account(mut)]
    pub fromTokenAcct: AccountInfo<'info>,
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
pub struct NewOrder<'info> {
    #[account(mut)]
    pub market: AccountInfo<'info>,
    #[account(mut)]
    pub openOrders: AccountInfo<'info>,
    #[account(mut)]
    pub requestQueue: AccountInfo<'info>,
    #[account(mut)]
    pub eventQueue: AccountInfo<'info>,
    #[account(mut)]
    pub marketBids: AccountInfo<'info>,
    #[account(mut)]
    pub marketAsks: AccountInfo<'info>,
    #[account(mut)]
    pub orderPayerTokenAccount: AccountInfo<'info>,
    #[account(mut)]
    pub openOrdersAuthority: AccountInfo<'info>,
    #[account(mut)]
    pub coinVault: AccountInfo<'info>,
    #[account(mut)]
    pub pcVault: AccountInfo<'info>,
    #[account(mut)]
    pub tokenProgram: AccountInfo<'info>,
    #[account(mut)]
    pub rent: AccountInfo<'info>,
    #[account(mut)]
    pub dexProgram: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CancelOrder<'info> {
    #[account(mut)]
    pub market: AccountInfo<'info>,
    #[account(mut)]
    pub openOrders: AccountInfo<'info>,
    #[account(mut)]
    pub requestQueue: AccountInfo<'info>,
    #[account(mut)]
    pub eventQueue: AccountInfo<'info>,
    #[account(mut)]
    pub marketBids: AccountInfo<'info>,
    #[account(mut)]
    pub marketAsks: AccountInfo<'info>,
    #[account(mut)]
    pub orderPayerTokenAccount: AccountInfo<'info>,
    #[account(mut)]
    pub openOrdersAuthority: AccountInfo<'info>,
    #[account(mut)]
    pub coinVault: AccountInfo<'info>,
    #[account(mut)]
    pub pcVault: AccountInfo<'info>,
    #[account(mut)]
    pub tokenProgram: AccountInfo<'info>,
    #[account(mut)]
    pub rent: AccountInfo<'info>,
    #[account(mut)]
    pub dexProgram: AccountInfo<'info>,
}

// Accounts
#[account]
pub struct DepositBase {
    pub deposit_auth: Pubkey,
    pub auth_bump: u8,
    pub sol_vault_bump: u8,
}

#[account]
pub struct Limit {
    pub asset_holding_pda: Pubkey,
    pub asset: Vec<Asset>,
    pub ask_price_per_asset: u64,
    pub ask_asset: Vec<Asset>,
    pub ask_asset_pda: Pubkey,
}

#[account]
pub struct Asset {
    pub asset_type: String,
    pub asset_metadata: Pubkey,
    pub asset_mint: Pubkey,
}

// Additional structures
// Events
// Errors
#[error_code]
pub enum ErrorCode {
}
