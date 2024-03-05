/**
 *Submitted for verification at Etherscan.io on 2023-08-14
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Genesis {
    address public owner;
    uint public projectTax;
    uint public projectCount;
    uint public balance;
    statsStruct public stats;
    projectStruct[] projects;

    mapping(uint => mapping(address => uint)) public contributions; 
    mapping(address => projectStruct[]) projectsOf;
    mapping(uint => backerStruct[]) backersOf;
    mapping(uint => bool) public projectExist;
    mapping(uint => mapping(address => bool)) public approvedProjects;
    mapping(uint => address[]) public approvedAddresses; 
    mapping(uint => address[]) public investorsOf;

    enum statusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct statsStruct {
        uint totalProjects;
        uint totalBacking;
        uint totalDonations;
    }

    struct backerStruct {
        address owner;
        uint contribution;
        uint timestamp;
        bool refunded;
    }

   struct projectStruct {
    uint id;
    address owner;
    string title;
    string description;
    string imageURL;
    string pdfURL; // New field for PDF URL
    uint cost;
    uint raised;
    uint timestamp;
    uint expiresAt;
    uint backers;
    statusEnum status;
    uint QuadraticFundingRatio;    
}

    modifier ownerOnly(){
        require(msg.sender == owner, "Owner reserved only");
        _;
    }

    event Action (
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    constructor(uint _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }

    function createProject(
    string memory title,
    string memory description,
    string memory imageURL,
    string memory pdfURL, // New parameter
    uint cost,
    uint expiresAt,
    uint QuadraticFundingRatio // New parameter
) public returns (bool) {
    require(bytes(title).length > 0, "Title cannot be empty");
    require(bytes(description).length > 0, "Description cannot be empty");
    require(bytes(imageURL).length > 0, "ImageURL cannot be empty");
    require(bytes(pdfURL).length > 0, "pdfURL cannot be empty"); // New validation
    require(cost > 0 ether, "Cost cannot be zero");
    require(QuadraticFundingRatio >= 2 && QuadraticFundingRatio <= 4, "Invalid Quadratic Funding Ratio"); // New validation

    projectStruct memory project;
    project.id = projectCount;
    project.owner = msg.sender;
    project.title = title;
    project.description = description;
    project.imageURL = imageURL;
    project.pdfURL = pdfURL; // Set the pdfURL
    project.cost = cost;
    project.timestamp = block.timestamp;
    project.expiresAt = expiresAt;
    project.QuadraticFundingRatio = QuadraticFundingRatio; // Set the Quadratic Funding Ratio

    projects.push(project);
    projectExist[projectCount] = true;
    projectsOf[msg.sender].push(project);
    stats.totalProjects += 1;

    emit Action (
        projectCount++,
        "PROJECT CREATED",
        msg.sender,
        block.timestamp
    );
    return true;
}


    function updateProject(
        uint id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint expiresAt
    ) public returns (bool) {
        require(msg.sender == projects[id].owner, "Unauthorized Entity");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");

        projects[id].title = title;
        projects[id].description = description;
        projects[id].imageURL = imageURL;
        projects[id].expiresAt = expiresAt;

        emit Action (
            id,
            "PROJECT UPDATED",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function deleteProject(uint id) public returns (bool) {
        require(projects[id].status == statusEnum.OPEN, "Project no longer opened");
        require(msg.sender == projects[id].owner, "Unauthorized Entity");

        projects[id].status = statusEnum.DELETED;
        performRefund(id);

        emit Action (
            id,
            "PROJECT DELETED",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function performRefund(uint id) internal {
        for(uint i = 0; i < backersOf[id].length; i++) {
            address _owner = backersOf[id][i].owner;
            uint _contribution = backersOf[id][i].contribution;
            
            backersOf[id][i].refunded = true;
            backersOf[id][i].timestamp = block.timestamp;
            payTo(_owner, _contribution);

            stats.totalBacking -= 1;
            stats.totalDonations -= _contribution;
        }
    }

    function backProject(uint id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether must be greater than zero");
        require(projectExist[id], "Project not found");
        require(projects[id].status == statusEnum.OPEN, "Project no longer opened");

        stats.totalBacking += 1;
        stats.totalDonations += msg.value;
        projects[id].raised += msg.value;
        projects[id].backers += 1;

        backersOf[id].push(
            backerStruct(
                msg.sender,
                msg.value,
                block.timestamp,
                false
            )
        );

        emit Action (
            id,
            "PROJECT BACKED",
            msg.sender,
            block.timestamp
        );

        if(projects[id].raised >= projects[id].cost) {
            projects[id].status = statusEnum.APPROVED;
            balance += projects[id].raised;
            performPayout(id);
            return true;
        }

        if(block.timestamp >= projects[id].expiresAt) {
            projects[id].status = statusEnum.REVERTED;
            performRefund(id);
            return true;
        }

        return true;
    }

      function investProject(uint id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether must be greater than zero");
        require(projectExist[id], "Project not found");

        stats.totalBacking += 1;
        stats.totalDonations += msg.value;
        projects[id].raised += msg.value;
        projects[id].backers += 1;

        contributions[id][msg.sender] += msg.value;
        investorsOf[id].push(msg.sender);

        emit Action (
            id,
            "PROJECT INVESTED",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function getInvestors(uint id) public view returns (address[] memory) {
        require(projectExist[id], "Project not found");
        return investorsOf[id];
    }

    function performPayout(uint id) internal {
        uint raised = projects[id].raised;
        uint tax = (raised * projectTax) / 100;

        projects[id].status = statusEnum.PAIDOUT;

        payTo(projects[id].owner, (raised - tax));
        payTo(owner, tax);

        balance -= projects[id].raised;

        emit Action (
            id,
            "PROJECT PAID OUT",
            msg.sender,
            block.timestamp
        );
    }

    function requestRefund(uint id) public returns (bool) {
        require(
            projects[id].status != statusEnum.REVERTED ||
            projects[id].status != statusEnum.DELETED,
            "Project not marked as revert or delete"
        );
        
        projects[id].status = statusEnum.REVERTED;
        performRefund(id);
        return true;
    }

    function payOutProject(uint id) public returns (bool) {
        require(projects[id].status == statusEnum.APPROVED, "Project not APPROVED");
        require(
            msg.sender == projects[id].owner ||
            msg.sender == owner,
            "Unauthorized Entity"
        );

        performPayout(id);
        return true;
    }

    function changeTax(uint _taxPct) public ownerOnly {
        projectTax = _taxPct;
    }

    function getProject(uint id) public view returns (projectStruct memory) {
        require(projectExist[id], "Project not found");

        return projects[id];
    }
    
    function getProjects() public view returns (projectStruct[] memory) {
        return projects;
    }
    
    function getBackers(uint id) public view returns (backerStruct[] memory) {
        return backersOf[id];
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

      function approveProject(uint id) public {
        require(projectExist[id], "Project does not exist");
        require(!approvedProjects[id][msg.sender], "Project already approved by this address");

        approvedProjects[id][msg.sender] = true;
        approvedAddresses[id].push(msg.sender); // Add the approved address to the list

        emit Action(
            id,
            "PROJECT APPROVED",
            msg.sender,
            block.timestamp
        );
    }

    function getApprovedAddresses(uint id) public view returns (address[] memory) {
        require(projectExist[id], "Project does not exist");

        return approvedAddresses[id];
    }
}


