# Aclean Decentralize Application Repository
Aclean Dapps Github Repository along with Documentation for running the Application Locally.

## Team Member Group 02
- Kevin Sorensen (00000062002) @flamengo5689
- Adhitya Bagus Wicaksono (00000048211) @adhitya.bw

## Tech Stacks ⚙️
- React JS (FrontEnd State Management)
- Chakra UI (FrontEnd Component)
- Solidity (Smart Contract Development)
- Truffle (Blockchain Framework)
- Ganache (Testing Network)
- Github (Version control)
- Discord, Line (Communication Tools)

## Project Folder Structure 📁
- aclean-dapps/
    - backend/
        - JSON CORS Testing
    - blockchain/
        - build/
          - Compiled Contract in JSON
        - contracts/
          - Smart Contract (Solidity)
        - migrations/
          - Deploy Contract
    - frontend/
        - build/
          - Build Info
        - public/
          - Font etc..
        - src/
          - components
          - contracts (copy compiled Contract from blockchain directory)
          - pages
          - theme
          - utilities
- doc/
    - Project Report & Documentation
- LICENSE
- README.md

## IDE Recommendation
- [Visual Studio Code](https://code.visualstudio.com/download)
  - [How to install](https://code.visualstudio.com/docs)

## Testing Network
- [Ganache](https://archive.trufflesuite.com/ganache/)
  - [Ganache Docs](https://archive.trufflesuite.com/docs/ganache/)
 
## Crypto Wallet Recommendation
- [Metamask](https://metamask.io/download/)
  - [Metamask Docs](https://docs.metamask.io/)

## Version
- pragma solidity >=0.8.19

## Setup
The following steps may help you to host this project locally.
1. Clone the project
    ```bash
    git clone git@github.com:kevinsorensen523/Aclean.git
    ```
2. Get into frontend Directory and Install all dependency and package
    ```bash
    cd aclean-dapps/frontend
    npm install
    ```
3. Install Ganache (Documentation Above) and Create an Workspace Exaple "ACLEAN-DAPPS", make sure the RPC Server is located at HTTP://127.0.0.1:7545

4. Install and Create Metamask Crypto Wallet (Documentation Above)

5. Add Network Manually on Metamask with this configuration
    - Network name : Ganache
    - New RPC URL : http://127.0.0.1:7545/
    - Chain ID : 1337
    - Currency Symbol : ETH

6. Install Solc With npm
   ```bash
   npm install -g solc
   solcjs --version
    ```
7. Install Truffle With npm
   ```bash
   npm install -g truffle
    ```

8. Compile and Copy the Compiled Contract in JSON from blockchain directory to frontend/src/contracts
   ```bash
    cd aclean-dapps/blockchain
    truffle compile
    truffle migrate --reset --network development
    ```

9. Host project by running 
    ```bash
    cd aclean-dapps/frontend
    npm start
    ```

## Miscellaneous Information
- Please run the Project in a browser connected to Metamask, Project denied a browser without Crypto Wallet
- Please Unlock Your Metamask Wallet to run the project smoothly
- Don't use currency other than ETH and don't use real ETH

### Work Organization
- **Kevin Sorensen**
  - Programmed the smart contract and flow control.
  - Connect blockchain to front end.
  - Testing with Ganache Testing Network.
    
- **Adhitya Bagus Wicaksono**
  - Designed the webpage UIs.
  - Implemented and programmed webpage functionality.

### Detail
- `README.md` is important; primarily to tell how to use your project. Keep it simple and straightforward.
- If an error occurs, it is the user's fault, not the developer's 😊

## Making Changes
### For a new feature:
- On `main` branch
- Create a branch `feature/your-new-feature-name`
- Add your changes
- Send a pull request to the `main` branch

### For a Bugfix:
- On `main` branch
- Create a branch `hotfix/your-hotfix-name`
- Add your changes
- Send a pull request to the `main` branch

## Releasing / Deployment
1. Before merging development to production, append new CHANGELOG to explain what changes is being made
   1. Commit the changes with message `Update CHANGELOG Aclean-dapps to x.x.x`
2. After merged to master, change the commit message to
   1. If releasing Aclean-dapps `Release Aclean-dapps x.x.x`
3. Create Release note and tag in gitlab for every release to production
   1. For Aclean-dapps name the release title and tag with `vx.x.x`

## Changes Log 📜
### Version 1.0.0
🌟 Main Changes:
- Initial Commit
- Add Home Page
- Add Transaction History
- Add My Service
- Add About Us
- Add Order Service, Create New Service and Delete Service
