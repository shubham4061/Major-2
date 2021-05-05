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

    
    enum completion {notregister,registred, pending , Completed}
    enum stages {registered ,first_vaccine,second_vaccine,completed}
    
    struct benificiary{
        uint benificiary_id;
        address benificiary_add;
        bytes32 medical_records;
        uint medical_center;
        uint vaccine_id_1;
        uint vaccine_id_2;
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
    }

    struct order{
        uint company_id;
        uint date;
        uint allotment;
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
        uint allocation;
    }

    struct district{
        uint stateid;
        uint id;
        string name;
        address add;
        uint allocation;
    }

    event _district(
        uint stateid,
        uint id,
        string name,
        address add,
        uint allocation
    );

    event _state(
        uint id,
        string name,
        address state_add,
        uint allocation
    );

    event _benificiary(
        uint benificiary_id,
        address benificiary_add,
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
    
    
    mapping(address=>benificiary) public _benificiaries;
    mapping(address => medical_center) public _medical_representatives;
    mapping(uint => vaccine_type) public _vaccine_types;
    mapping(uint => vaccines) public _vaccines;
    mapping(address => manager) public _managers;
    mapping(address => state) public states;
    mapping(address => district) public districts;
    mapping(uint => order) public orders;

    state[] public stateInfo;
    state private stateTemp;

    district[] public districtInfo;
    district private districtTemp;

    vaccine_type[] public vaccinesInfo;
    vaccine_type private vaccineTemp;
    
    constructor() public
    {
        _owner = msg.sender;
        center_counts = 0;
        total_registration = 0;
        types_counts = 0;
        vaccines_counts = 0;
        states_count = 0;
        district_count = 0;
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
        stateTemp.allocation = 0;
        stateInfo.push(stateTemp);
        states[state_add] = stateTemp;
        states_count++;
    }

    function update_state(uint state_id,uint newOrder)public onlyOwner
    {
        stateInfo[state_id].allocation+=newOrder;
        states[stateInfo[state_id].state_add].allocation+=newOrder;
    }


    function place_order(uint company_id,uint newOrder)public onlyOwner
    {
        orders[company_id].allotment+=newOrder;
    }

    function register_district(string memory name,address district_add)public onlyOwner
    {
        districtTemp.stateid = states[msg.sender].id;
        districtTemp.id = district_count;
        districtTemp.name = name;
        districtTemp.add = district_add;
        districtTemp.allocation = 0;
        districtInfo.push(districtTemp);
        districts[district_add] = districtTemp;
        district_count++;
    }

    function update_district_allocation(uint district_id,uint newOrder)public onlyOwner
    {
        districtInfo[district_id].allocation+=newOrder;
        districts[districtInfo[district_id].add].allocation+=newOrder;
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


    function register_company(uint period,uint temp_min,uint temp_max,string memory name,address company_add)public onlyOwner
    {
        types_counts++;

        vaccineTemp.name = name;
        vaccineTemp.company_id = types_counts;
        vaccineTemp.temp_max = temp_max;
        vaccineTemp.temp_min = temp_min;
        vaccineTemp.valid_days = period;
        vaccineTemp.company_add = company_add;

        _vaccine_types[types_counts] = vaccineTemp;
        vaccinesInfo.push(vaccineTemp);

        _managers[company_add].company_id =types_counts;
        _managers[company_add].manager_add = company_add;

         emit _vaccine_type(name,types_counts,period,temp_min,temp_max,company_add);

         types_counts++;
    }
    
    
    function vaccine_registration(uint company_id,uint batch,uint time,uint cur_temp)public
    {
        require(_vaccine_types[company_id].company_add == msg.sender,"invalid user");
        vaccines_counts++;
        _vaccines[vaccines_counts].id = vaccines_counts;
        _vaccines[vaccines_counts].batch = batch;
        _vaccines[vaccines_counts].manunfactured_date = time;
        _vaccines[vaccines_counts].valid = true;
        _vaccines[vaccines_counts].temp_min = cur_temp;
        _vaccines[vaccines_counts].temp_max = cur_temp;
    }
    
    
    function register_benificiary(address benificiary_add,bytes32 record_hash) public
    {
        require(record_hash.length > 0);
        require(_medical_representatives[msg.sender].center_id > 0);
        total_registration++;
        _benificiaries[benificiary_add].benificiary_id = total_registration;
        _benificiaries[benificiary_add].benificiary_add = benificiary_add;
        _benificiaries[benificiary_add].medical_reprentative = msg.sender;
        _benificiaries[benificiary_add].medical_center = _medical_representatives[msg.sender].center_id;
        _benificiaries[benificiary_add].vaccine_id_1 = 0;
        _benificiaries[benificiary_add].vaccine_id_2 = 0;
        
        
    }
    
    function register_medical_representative(address representative_add)public onlyOwner
    {
        center_counts++;
        _medical_representatives[representative_add].center_id = center_counts;
        _medical_representatives[representative_add].medical_representative = representative_add;
        
        emit _medical_center(center_counts++, representative_add);
    }
    
    function vaccinate(address benificiary_add,uint vaccine_id)public
    {
         require(_vaccines[vaccine_id].temp_min > _vaccine_types[_vaccines[vaccine_id].company_id].temp_min,'invalid_min_temp');
         require(_vaccines[vaccine_id].temp_max < _vaccine_types[_vaccines[vaccine_id].company_id].temp_max,'invalid+max_temp');
         require(_vaccines[vaccine_id].valid);
         if(_benificiaries[benificiary_add].status == stages(0))
         {
            _benificiaries[benificiary_add].vaccine_id_1 = vaccine_id;
            _benificiaries[benificiary_add].status = stages(1);
         }
         else 
         {
            _benificiaries[benificiary_add].vaccine_id_2 = vaccine_id;   
            _benificiaries[benificiary_add].status = stages(2);
         }
     }
    
    
}