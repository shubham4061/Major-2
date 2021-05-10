const Dist_management = artifacts.require('./vaccine.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('vaccine', ([deployer,company_add1,state_reprentative_1,benificiary_1,state_1,state_2,state_3,dist_1,dist_2]) => {
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


  describe('vaccine company registration',async () => {
      let result
      it('company registered successfully' , async () => {
            result = await DM.register_company(30,2,10,'covishield',company_add1,{from:deployer})
           // console.log(result.logs)
      })

      it(' Output' , async () => {
        result = await DM.getAllvaccineInfo({from:deployer})
        console.log(result)
      })


  })

  // describe('Benificiary registration',async () => {
  //     let result
  //     it('benificiary registered successfully' , async () => {
  //           result = await DM.register_benificiary(benificiary_1,'0x10f6d3ce9d854d1ebfc1ca7d1981fafc122a9970093382f2c5c72cfa6ab47572',{from:state_reprentative_1})
  //           console.log(result.logs)
  //     })
  // })

  describe('Place order',async () => {
    let result
    it('place order 1' , async () => {
          result = await DM.place_order(0,50,{from:deployer})
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
          result = await DM.update_state(0,0,12,{from:deployer})
    })


    it(' Bihar ' , async () => {
      result = await DM.update_state(1,0,4,{from:deployer})
    })


    it(' Haryana ' , async () => {
      result = await DM.update_state(2,0,3,{from:deployer})
    })

    
    it(' Output' , async () => {
      result = await DM.getAllStatesInfo({from:deployer})
      console.log(result)
    })

  })


  describe('District registration',async () => {
    let result
    it(' Prayagraj ' , async () => {
          result = await DM.register_district(" Prayagraj",dist_1,{from:state_1})
    })

    it(' kanpur ' , async () => {
      result = await DM.register_district(" Kanpur",dist_2,{from:state_1})
    })

    it(' Output' , async () => {
      result = await DM.getAllDistrictInfo({from:deployer})
      console.log(result)
    })

  })

  describe('District Allocation',async () => {
    let result
    it(' Prayagraj ' , async () => {
          result = await DM.update_district_allocation(0,0,7,{from:state_1})
    })

    it(' kanpur ' , async () => {
      result = await DM.update_district_allocation(1,0,4,{from:state_1})
    })

    it(' Output' , async () => {
      result = await DM.getAllDistrictInfo({from:deployer})
      console.log(result)
    })

  })

  
  describe('Register yourself',async () => {
      let result
      it('shubham' , async () => {
            result = await DM.register_yourself("Shubham",123456789123,21,169,72,{from:company_add1})
            //console.log(result.logs)
      })

      it('Jindal' , async () => {
        result = await DM.register_yourself("Jindal",696969696969,69,169,69,{from:company_add1})
        //console.log(result.logs)
      })
  })

  describe('Verification',async () => {
      let result
      it('shubham' , async () => {
            result = await DM.verification(123456789123,{from:dist_1})
            //console.log()
      })

      it('Jindal' , async () => {
        result = await DM.verification(696969696969,{from:dist_1})
        //console.log(result.logs)
      })
  })

  describe('vaccination',async () => {
      let result
      it("shubham's first vaccine " , async () => {
            result = await DM.vaccinate(123456789123,1,{from:dist_1})
            //console.log()
      })

      it("jindal's first vaccine "  , async () => {
        result = await DM.vaccinate(696969696969,2,{from:dist_1})
        //console.log(result.logs)
      })

      it("jindal's second vaccine "  , async () => {
        result = await DM.vaccinate(696969696969,3,{from:dist_1})
        //console.log(result.logs)
        result = await DM.getYourStatus(696969696969,{from:dist_1})
        console.log(result);
      })

      it("jindal's third vaccine "  , async () => {
        result = await DM.vaccinate(696969696969,4,{from:dist_1})
        console.log(result.logs)
        result = await DM.getYourStatus(696969696969,{from:dist_1})
        console.log(result);
      })
  })

  describe('know your vaccine',async () => {
    let result
    it("Check vaccine 1 " , async () => {
          result = await DM.verifyVaccine(1,{from:dist_1})
          console.log(result);
    })
})

  

  

})

