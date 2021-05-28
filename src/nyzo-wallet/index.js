console.log("Hello Nyzo!")

import * as bip39 from "bip39"
import QRCode from 'easyqrcodejs'
import { NyzoKey } from "./NyzoKey"
import { NYZO_PASSWORD } from './keys'

const generate_mnemonic = (bits=128) => bip39.generateMnemonic(bits)

//export const generate_mnemonic12 = () => generate_mnemonic(128)

export const generate_mnemonic24 = () => generate_mnemonic(256)

export const buildKey = () => new NyzoKey().fromBIP39(generate_mnemonic24(), NYZO_PASSWORD)