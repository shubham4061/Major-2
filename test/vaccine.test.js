const Dist_management = artifacts.require('./vaccine.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('vaccine', ([deployer,company_add1,state_reprentative_1,benificiary_1,state_1,state_2,state_3]) => {
  let DM
  before(async () => {
    DM = await Dist_management.deployed({from:deployer})
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await DM.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  describe('State Registration',async () => {
      let result
      it('state registartion sucess' , async () => {
            result = await DM.register_medical_representative(state_reprentative_1,{from:deployer})
            console.log(result.logs.logIndex)
      })
  })

  describe('vaccine company registration',async () => {
      let result
      it('company registered successfully' , async () => {
            result = await DM.register_company(30,2,10,'covisheild',company_add1,{from:deployer})
            console.log(result.logs)
      })
  })

  describe('Benificiary registration',async () => {
      let result
      it('benificiary registered successfully' , async () => {
            result = await DM.register_benificiary(benificiary_1,'0x10f6d3ce9d854d1ebfc1ca7d1981fafc122a9970093382f2c5c72cfa6ab47572',{from:state_reprentative_1})
            console.log(result.logs)
      })
  })
  
  
  describe('state registration',async () => {
    let result
    it(' Uttar pradesh ' , async () => {
          result = await DM.register_state("Uttar pradesh",state_1,{from:deployer})
    })


    it(' Bihar ' , async () => {
      result = await DM.register_state("Bihar",state_2,{from:deployer})
    })


    it(' Haryana ' , async () => {
      result = await DM.register_state("haryana",state_3,{from:deployer})
    })

    
    it(' Output' , async () => {
      result = await DM.getAllStatesInfo({from:deployer})
      console.log(result)
    })

  })
  
  
  describe('state quota Allocation',async () => {
    let result
    it(' Uttar pradesh ' , async () => {
          result = await DM.update_state(0,50,{from:deployer})
    })


    it(' Bihar ' , async () => {
      result = await DM.update_state(1,35,{from:deployer})
    })


    it(' Haryana ' , async () => {
      result = await DM.update_state(2,40,{from:deployer})
    })

    
    it(' Output' , async () => {
      result = await DM.getAllStatesInfo({from:deployer})
      console.log(result)
    })

  })

  
  describe('vaccine registration',async () => {
      let result
      it('vaccine registered successfully1' , async () => {
            result = await DM.vaccine_registration(1,0,24,7,{from:company_add1})
            console.log(result.logs)
      })
  })

  

})

