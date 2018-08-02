import { Observable } from 'rxjs';
import { Wallet, PublicAddress } from './types';
/**
 *  Transfer token's from one wallet to another
 */
export declare const transfer: (fn: (state: any) => any) => (source: Observable<any>) => Observable<any>;
/**
 * Create operation in blocchain
 */
export declare const operation: () => <T>(source: Observable<Wallet>) => Observable<T>;
/**
 * Get head for operation
 */
export declare const head: () => (source: Observable<any>) => Observable<any>;
/**
 * Get counter for contract
 */
export declare const counter: () => (source: Observable<any>) => Observable<any>;
/**
* Get manager key for contract
*/
export declare const managerKey: () => (source: Observable<any>) => Observable<any>;
/**
 * Apply and inject operation into node
 */
export declare const applyAndInjectOperation: () => (source: Observable<any>) => Observable<any>;
/**
 * Get wallet details
 */
export declare const getWallet: (fn?: ((params: any) => PublicAddress) | undefined) => <T>(source: Observable<T>) => Observable<T>;
/**
 * Generate new menomonic, private, public key & tezos wallet address
 */
export declare const newWallet: () => <T>(source: Observable<T>) => Observable<Wallet>;
/**
 * Wait for sodium to initialize
 */
export declare const initialize: () => (source: Observable<any>) => Observable<any>;
