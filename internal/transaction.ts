import { of } from 'rxjs'
import { tap } from 'rxjs/operators';

import { Config, initializeWallet, transaction, pendingOperation, confirmOperation } from '../src'

// support for node.js
import './node'

console.log('[+] tezos wallet client')

// wallet used to create transaction with small tez amount
const wallet: Config = {
    secretKey: 'edsk3hEtniBGLP2wqYnc1Lix1hhV74eEenRBTfxjHTRHP59R7BapMW',
    publicKey: 'edpkth42B7j7rvLeZWmufj28a7sEdbMBb9y16qgQmGHYGX4hPis9V4',
    publicKeyHash: 'tz1WCojrEZWrjenejUZmG8QNsMtKPELx2TFA',
    node: {
        name: 'mainnet',
        display: 'Mainnet',
        url: 'https://mainnet.simplestaking.com:3000',
        tzstats: {
            url: 'http://tzstats.com/account/'
        }
    },
    type: 'web'
}

const walletObservable = of([])

// create observable with state  
walletObservable.pipe(

    // wait for sodium to initialize
    initializeWallet(stateWallet => ({
        secretKey: wallet.secretKey,
        publicKey: wallet.publicKey,
        publicKeyHash: wallet.publicKeyHash,
        // set Tezos node
        node: wallet.node,
        // set wallet type: WEB, TREZOR_ONE, TREZOR_T
        type: wallet.type,
    })),

    // originate contract
    transaction(stateWallet => ({
        to: 'tz1N4wqm7mqCFECjh8HUNHLyxfL73ay981LH',
        amount: '1',
        fee: '0.01'
    })),

    // originate contract
    tap(state => pendingOperation(stateWallet => ({
        publicKeyHash: 'tz1N4wqm7mqCFECjh8HUNHLyxfL73ay981LH',
    }))
    ),

    // wait until operation is confirmed & moved from mempool to head
    confirmOperation(stateWallet => ({
        injectionOperation: stateWallet.injectionOperation,
    })),


).subscribe(
    data => console.log('[+] ok'),
    error => console.error('[-] error', error)
)
