pragma solidity ^0.5.16;

contract vaccine{
    uint public total_registration;
    uint public center_counts;
    uint public types_counts;
    address _owner;
    uint public vaccines_counts;
    
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
    
    
    constructor() public
    {
        _owner = msg.sender;
        center_counts = 0;
        total_registration = 0;
        types_counts = 0;
        vaccines_counts = 0;
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
    
    function register_company(uint period,uint temp_min,uint temp_max,string memory name,address company_add)public onlyOwner
    {
        types_counts++;
        _vaccine_types[types_counts].name = name;
        _vaccine_types[types_counts].company_id = types_counts;
        _vaccine_types[types_counts].temp_max = temp_max;
        _vaccine_types[types_counts].temp_min = temp_min;
        _vaccine_types[types_counts].valid_days = period;
        _vaccine_types[types_counts].company_add = company_add;
        _managers[company_add].company_id =types_counts;
        _managers[company_add].manager_add = company_add;
         emit _vaccine_type(name,types_counts,period,temp_min,temp_max,company_add);
    }
    
    
    function vaccine_registration(uint company_id,uint batch,uint time,uint cur_temp)public
    {
        require(_vaccine_types[company_id].company_add == msg.sender);
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