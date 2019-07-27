const  {  LibraWallet ,LibraClient,LibraNetwork} = require('kulap-libra')
const Bignumber = require('bignumber.js')

const client = new LibraClient({network : LibraNetwork.Testnet })

const createWallet = async ()=>{
    //const wallet = new LibraWallet()
    const wallet = new LibraWallet({
        mnemonic : 'remember siege panther ankle decade nasty daring super rose throw traffic tortoise laugh egg shove risk mail link pool carry spoil tree deposit tape'
    })
    const account = wallet.newAccount()

    return {
        account,
        address : account.getAddress().toHex(),
        mnemonic : wallet.config.mnemonic
    }
}

const queryBalance = async (address)=>{
    
    const accountState = await client.getAccountState(address)
    const balanceInMicroLibras = Bignumber(accountState.balance.toString())
    const balance = balanceInMicroLibras.dividedBy(Bignumber(1e6))
    return {
            balanceInMicroLibras : balanceInMicroLibras.toString(10),
            balance : balance.toString(10)
    }

}

const transferCoin = async (account,toAddress,amount)=>{
    const data = await client.transferCoins(
            account,
            toAddress,
            Bignumber(amount).times(1e6)
    )
    return data;
}

(async ()=>{
    const wallet = await createWallet()
    console.log('wallet ::==',wallet)

    const balanceBefore = await queryBalance(wallet.address)
    console.log('balance before ::==',balanceBefore)

    const result = await transferCoin(
                wallet.account,
                '4484d21b8f14906b0db49ddedec61413f071a5419d4befcdd98561a5bcaf3089',
                44
        )
        //console.log('result ::==',result)
    
    const balanceAfter = await queryBalance(wallet.address)
    console.log('balance after ::==',balanceAfter)    
})()