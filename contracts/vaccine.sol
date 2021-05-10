pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract vaccine{
    uint public total_registration;
    uint public center_counts;
    uint public types_counts;
    address public _owner;
    uint public vaccines_counts;
    uint public states_count;
    uint public district_count;
    uint public available;
    uint public vaccinated;
    uint public distributed;
    uint public batch_Count;

    
    enum completion {notregister,registred, pending , Completed}
    enum stages {registered ,first_vaccine,second_vaccine,completed}
    
    struct benificiary{
        uint benificiary_id;
       // address benificiary_add;
        uint256 medical_records;
        uint district_id;
        uint vaccine_id_1;
        uint256 first_vaccine_time;
        uint vaccine_id_2;
        uint256 second_vaccine_time;
        address medical_reprentative;
        stages status;
    }
    
    struct medical_center{
        uint center_id;
        address medical_representative;
    }
    
    struct vaccine_type{
        string name;
        uint company_id;
        uint valid_days;
        uint temp_min;
        uint temp_max;
        address company_add;
        uint[] batches;
    }

    struct order{
        uint company_id;
        //uint date;
        uint allotment;
        uint instock;
        uint vaccinated;
    }
    
    struct vaccines{
        uint id;
        uint batch;
        uint company_id;
        uint manunfactured_date;
        uint temp_min;
        uint temp_max;
        bool valid;
    }
    
    struct manager{
        uint company_id;
        address manager_add;
    }


    struct state{
        uint id;
        string name;
        address state_add;
        order[] allotment;
        uint instock;
        uint vaccinated;
        uint distributed;
    }

    struct district{
        uint stateid;
        uint id;
        string name;
        address add;
        order[] allotment;
        uint instock;
        uint vaccinated;
        uint distributed;
    }

    struct Medical_Record{
        uint id;
        string name;
        uint256 aadhar;
        uint age;
        uint height;
        uint weight;
        bool valid;
    }

    event _district(
        uint stateid,
        uint id,
        string name,
        address add,
        uint allocation,
        uint instock,
        uint vaccinated,
        uint distributed
    );

    event _state(
        uint id,
        string name,
        address state_add,
        uint allocation,
        uint instock,
        uint vaccinated,
        uint distributed
    );

    event _benificiary(
        uint benificiary_id,
       // address benificiary_add,
        bytes32 medical_records,
        uint medical_center,
        uint vaccine_id_1,
        uint vaccine_id_2,
        address medical_reprentative,
        stages status
    );
    
    event _medical_center(
        uint center_id,
        address medical_representative
    );
    
    event _vaccine_type(
        string name,
        uint company_id,
        uint valid_days,
        uint temp_min,
        uint temp_max,
        address company_add
    );
    
    event _vaccine(
        uint id,
        uint batch,
        uint company_id,
        uint manunfactured_date,
        uint temp_min,
        uint temp_max,
        bool valid
    );
    
    event _manager(
        uint company_id,
        address manager_add
    );
    
    
    
    modifier onlyOwner {
        require(msg.sender == _owner,'Not authorised');
        _;
    }

    modifier onlyState {
        bool flag = false;
        for(uint i = 0;i<states_count;i++)
        {
            if(stateInfo[i].state_add == msg.sender)
            {
                flag = true;
                break;
            }
        }
        require(flag,'You are not a state ');
        _;
    }

     modifier onlyDistrict {
        bool flag = false;
        for(uint i = 0;i<district_count;i++)
        {
            if(districtInfo[i].add == msg.sender)
            {
                flag = true;
                break;
            }
        }
        require(flag,'You are not a District ');
        _;
    }
    
    
    mapping(uint256=>benificiary) public _benificiaries;
    mapping(address => medical_center) public _medical_representatives;
    mapping(uint => vaccine_type) public _vaccine_types;
    mapping(uint => vaccines) public _vaccines;
    mapping(address => manager) public _managers;
    mapping(address => state) public states;
    mapping(address => district) public districts;
    mapping(uint256 =>Medical_Record) public records;

  //  mapping(uint => order) public orders;

    state[] public stateInfo;
    state private stateTemp;

    district[] public districtInfo;
    district private districtTemp;

    vaccine_type[] public vaccinesInfo;
    vaccine_type private vaccineTemp;

    order[] public orders;
    order private tempOrder;
    
    constructor() public
    {
        _owner = msg.sender;
        center_counts = 0;
        total_registration = 0;
        types_counts = 0;
        vaccines_counts = 0;
        states_count = 0;
        district_count = 0;
        batch_Count = 0;
    }
    
    
    function transferOwnership(address benificiary_add) public onlyOwner
    {
        _owner = benificiary_add;
    }
    
   // function update_medical_representative(address representative_add,address )
    function View_Owner() public view returns(address){
        return _owner;
    }

    function View_types_Count() public view returns(uint){
        return types_counts;
    }


    
    function register_state(string memory name,address state_add)public onlyOwner
    {
        stateTemp.id = states_count;
        stateTemp.name = name;
        stateTemp.state_add = state_add;

        for(uint i = 0;i< types_counts;i++)
        {
            tempOrder.company_id = 0;
            tempOrder.allotment = 0;
            tempOrder.instock = 0;
            tempOrder.vaccinated = 0;
            stateTemp.allotment.push(tempOrder);
        }

        stateTemp.instock = 0;
        stateTemp.vaccinated = 0;
        stateTemp.distributed = 0;

        stateInfo.push(stateTemp);
        states[state_add] = stateTemp;
        states_count++;
    }


    function register_district(string memory name,address district_add)public onlyState
    {
        districtTemp.stateid = states[msg.sender].id;
        districtTemp.id = district_count;
        districtTemp.name = name;
        districtTemp.add = district_add;

        for(uint i = 0;i< types_counts;i++)
        {
            tempOrder.company_id = i;
            tempOrder.allotment = 0;
            tempOrder.instock = 0;
            tempOrder.vaccinated = 0;
            districtTemp.allotment.push(tempOrder);
        }
        districtTemp.instock = 0;
        districtTemp.vaccinated = 0;
        districtTemp.distributed = 0;
        districtInfo.push(districtTemp);
        districts[district_add] = districtTemp;
        district_count++;
    }


    function place_order(uint company_id,uint newOrder)public onlyOwner
    {
        require(company_id < types_counts,"Invalid company");
        orders[company_id].allotment+=newOrder;
        orders[company_id].instock+=newOrder;
        available+=newOrder;
        uint temp = (vaccinesInfo[company_id].temp_max+vaccinesInfo[company_id].temp_min)/2;
        vaccinesInfo[company_id].batches.push(batch_Count);
        vaccine_registration(company_id, batch_Count, now,temp,newOrder);
        batch_Count++;
    }


    function update_state(uint state_id,uint company_id,uint newOrder)public onlyOwner
    {
        require(state_id < states_count,"Invalid state - id");
        require(company_id < types_counts,"invalid company - id");
        require(orders[company_id].instock >= newOrder,"order limit exceeds please place order to company first or try diffent vaccine");
        stateInfo[state_id].allotment[company_id].allotment+=newOrder;
        stateInfo[state_id].allotment[company_id].instock+=newOrder;
        stateInfo[state_id].instock+=newOrder;

        orders[company_id].instock-=newOrder;
        available-=newOrder;
        distributed+=newOrder; 

    }
   

    function update_district_allocation(uint district_id,uint company_id,uint newOrder)public onlyState
    {
        require(district_id < district_count,"Invalid district - id");
        uint sid = states[msg.sender].id;
        require(districtInfo[district_id].stateid == sid,"this district is not in your state");
        require(company_id < types_counts,"invalid company - id");
        require(stateInfo[sid].allotment[company_id].instock >= newOrder,"order limit exceeds please place order to company first or try diffent vaccine");

        
        districtInfo[district_id].allotment[company_id].allotment+=newOrder;
        districtInfo[district_id].allotment[company_id].instock+=newOrder;

        stateInfo[sid].allotment[company_id].instock-=newOrder;
        stateInfo[sid].instock-=newOrder;
        stateInfo[sid].distributed+=newOrder;

    }


    function getAllStatesInfo() public view returns (state[] memory)
    {
        return stateInfo;
    }

    function getAllvaccineInfo() public view returns (vaccine_type[] memory)
    {
        return vaccinesInfo;
    }

    function getAllDistrictInfo() public view returns (district[] memory)
    {
        return districtInfo;
    }

    function verifyVaccine(uint id) public view returns (vaccines memory)
    {
        return _vaccines[id];
    }

    function getAllOrdersInfo() public view returns (order[] memory)
    {
        return orders;
    }

    function getYourStatus(uint256 aadhar) public view returns(benificiary memory)
    {
        return _benificiaries[aadhar];
    }


    function register_company(uint period,uint temp_min,uint temp_max,string memory name,address company_add)public onlyOwner
    {
        vaccineTemp.name = name;
        vaccineTemp.company_id = types_counts;
        vaccineTemp.temp_max = temp_max;
        vaccineTemp.temp_min = temp_min;
        vaccineTemp.valid_days = period;
        vaccineTemp.company_add = company_add;

        _vaccine_types[types_counts] = vaccineTemp;
        vaccinesInfo.push(vaccineTemp);

        tempOrder.company_id = types_counts;
        tempOrder.allotment = 0;
        tempOrder.instock = 0;
        tempOrder.vaccinated = 0;
        
        for(uint i = 0;i<states_count;i++)
        {
            stateInfo[i].allotment.push(tempOrder);
        }

        for(uint i = 0;i<district_count;i++)
        {
            districtInfo[i].allotment.push(tempOrder);
        }
        orders.push(tempOrder);

        _managers[company_add].company_id =types_counts;
        _managers[company_add].manager_add = company_add;

         emit _vaccine_type(name,types_counts,period,temp_min,temp_max,company_add);

         types_counts++;
    }
    
    
    function vaccine_registration(uint company_id,uint batch,uint time,uint cur_temp,uint quantity)private
    {
        for(uint i = 0;i<quantity;i++)
        {
            _vaccines[vaccines_counts].id = vaccines_counts;
            _vaccines[vaccines_counts].company_id = company_id;
            _vaccines[vaccines_counts].batch = batch;
            _vaccines[vaccines_counts].manunfactured_date = time;
            _vaccines[vaccines_counts].valid = true;
            _vaccines[vaccines_counts].temp_min = cur_temp;
            _vaccines[vaccines_counts].temp_max = cur_temp;
            vaccines_counts++;
        }
    }
    
    
    function register_yourself(string memory name,uint256 aadhar,uint age,uint height,uint weight) public
    {
        require(aadhar != records[aadhar].aadhar,"dont use same aadhar");
        require(age >= 18,"you are below age");
        //require(name != "","Invalid name");
        records[aadhar].id = total_registration;
        records[aadhar].aadhar = aadhar;
        records[aadhar].name = name;
        records[aadhar].age = age;
        records[aadhar].weight = weight;
        records[aadhar].height = height;
        records[aadhar].valid = false;
        total_registration++;
    }


    // function register_benificiary(string name,uint256 aadhar,uint age,uint height,uint weight) public
    // {

        
    //     require(record_hash.length > 0);
    //     //require(_medical_representatives[msg.sender].center_id > 0);
    //     total_registration++;
    //     _benificiaries[record_hash].benificiary_id = total_registration;
    //    // _benificiaries[benificiary_add].benificiary_add = benificiary_add;
    //     _benificiaries[record_hash].medical_reprentative = msg.sender;
    //     _benificiaries[record_hash].medical_center = _medical_representatives[msg.sender].center_id;
    //     _benificiaries[record_hash].vaccine_id_1 = 0;
    //     _benificiaries[record_hash].vaccine_id_2 = 0;
   
        
    // }
    

    function verification(uint256 aadhar)public onlyDistrict
    {
        require(records[aadhar].aadhar == aadhar,"You are not registerd yet");
        require(records[aadhar].valid == false,"You are already verified");
        records[aadhar].valid = true;
        _benificiaries[aadhar].benificiary_id = records[aadhar].id;
        _benificiaries[aadhar].medical_records = aadhar;
        _benificiaries[aadhar].district_id = districts[msg.sender].id;
        _benificiaries[aadhar].medical_reprentative = msg.sender;
        _benificiaries[aadhar].status = stages(0);

    }

    function vaccinate(uint256 record_hash,uint vaccine_id)public onlyDistrict
    {
        
         require(_vaccines[vaccine_id].temp_min > _vaccine_types[_vaccines[vaccine_id].company_id].temp_min,'invalid_min_temp');
         require(_vaccines[vaccine_id].temp_max < _vaccine_types[_vaccines[vaccine_id].company_id].temp_max,'invalid+max_temp');
         require(_vaccines[vaccine_id].valid);
         require(_benificiaries[record_hash].status != stages(2),"you have already completed your vaccication");
         if(_benificiaries[record_hash].status == stages(0))
         {
            _benificiaries[record_hash].vaccine_id_1 = vaccine_id;
            _benificiaries[record_hash].status = stages(1);
            _benificiaries[record_hash].first_vaccine_time = now;
         }
         else
         {
            _benificiaries[record_hash].vaccine_id_2 = vaccine_id;   
            _benificiaries[record_hash].status = stages(2);
            _benificiaries[record_hash].second_vaccine_time = now;
         }
     }


    
    
}