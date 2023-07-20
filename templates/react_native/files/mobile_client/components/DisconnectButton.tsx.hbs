import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps} from 'react';
import {Button} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';

type Props = Readonly<ComponentProps<typeof Button>>;

export default function DisconnectButton(props: Props) {
  const {deauthorizeSession} = useAuthorization();
  return (
    <Button
      {...props}
      color="red"
      onPress={() => {
        transact(async wallet => {
          await deauthorizeSession(wallet);
        });
      }}
    />
  );
}
