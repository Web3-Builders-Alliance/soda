import {useConnection} from './providers/ConnectionProvider';
import React, {useState, useCallback} from 'react';
import {Button} from 'react-native';
import {Account} from './providers/AuthorizationProvider';

type Props = Readonly<{
  selectedAccount: Account;
  onAirdropComplete: (account: Account) => void;
}>;

const LAMPORTS_PER_AIRDROP = 100000000;

export default function RequestAirdropButton({
  selectedAccount,
  onAirdropComplete,
}: Props) {
  const {connection} = useConnection();
  const [airdropInProgress, setAirdropInProgress] = useState(false);
  const requestAirdrop = useCallback(async () => {
    const signature = await connection.requestAirdrop(
      selectedAccount.publicKey,
      LAMPORTS_PER_AIRDROP,
    );
    return await connection.confirmTransaction(signature);
  }, [connection, selectedAccount]);
  return (
    <Button
      title="Request Airdrop"
      disabled={airdropInProgress}
      onPress={async () => {
        if (airdropInProgress) {
          return;
        }
        setAirdropInProgress(true);
        try {
          const result = await requestAirdrop();
          if (result) {
            const {
              value: {err},
            } = result;
            if (err) {
              console.log(
                'Failed to fund account: ' +
                  (err instanceof Error ? err.message : err),
              );
            } else {
              console.log({children: 'Funding successful'});
              onAirdropComplete(selectedAccount);
            }
          }
        } finally {
          setAirdropInProgress(false);
        }
      }}
    />
  );
}
