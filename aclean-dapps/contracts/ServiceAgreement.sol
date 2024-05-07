// SPDX-License-Identifier: PRIVATE
pragma solidity >=0.8.1;

/**
 *@title ServiceAgreement
 * Implements Service Agreement between two parties
 */

contract ServiceAgreement {
    address client;
    address provider;
    uint termsAmount;
    WorkStatus public agreementStatus;
    ClientApprovalStatus public clientApprovalStatus;
    Rating public clientRating;
    bool private agreementFulfilledOrNullified;

    constructor(
        address _client,
        address _provider,
        uint256 _termsAmount
    ) {
        client = _client;
        provider = _provider;
        termsAmount = _termsAmount;
        agreementStatus = WorkStatus.NotStarted;
        clientApprovalStatus = ClientApprovalStatus.WaitingForApproval;
        clientRating = Rating.UnRated;
        agreementFulfilledOrNullified = false;
    }

    enum WorkStatus {
        NotStarted,
        Started,
        Completed,
        WillNotComplete
    }

    enum ClientApprovalStatus {
        WaitingForApproval,
        Approved,
        UnApproved
    }

    enum Rating {
        UnRated,
        OneStar,
        TwoStar,
        ThreeStar,
        FourStar,
        FiveStar
    }
    modifier providerOnly() {
        require(msg.sender == provider, "Only the service Provider can call this.");
        _;
    }

    modifier clientOnly() {
        require(msg.sender == client, "Only the client can call this.");
        _;
    }
    event ServiceStatusUpdate(
        address indexed agreementAddress,
        WorkStatus agreementStatus
    );

    function updateServiceStatus(WorkStatus _status) external {
        agreementStatus = _status;

        emit ServiceStatusUpdate(address(this), agreementStatus);
    }

    function updateClientApprovalStatus(ClientApprovalStatus _approve) external {
        require(agreementStatus == WorkStatus.Completed, "The contract not been marked as completed by the service provider");
        clientApprovalStatus = _approve;
    }

    function rateServiceProvider(Rating _rating) external clientOnly {
        clientRating = _rating;
    }

    function deposit() external payable clientOnly {
        require(!agreementFulfilledOrNullified, "Agreement has already been fulfilled");
    }

    // function getAgreementDetails() external view returns() {
    //     return (client, provider, address(this).balance, agreementStatus, clientApprovalStatus, clientRating, agreementFulfilledOrNullified, termsAmount);
    // }
}