# MediInvest
Medical Vaccines and Equipment are very expensive Research Projects. This project is based on a quadratic Funding mechanism. The medical vaccines and Equipment researcher can create a CrowdFunding project with all the details and quadratic function for Matching Funding from Investors. This project lets researcher invite other veterans and researcher to verify and approve project from documents which are not available to the general public. Investor can fund and earn the rights to manufacture and distribution of Medicine and Equipments.
 <p align="center">
  <img alt="Dark" src="https://github.com/adi99/MediInvest/blob/main/ProjectView.jpg" width="100%">
</p>

<h4>Core functions:</h4>
<ul>
  <li><b>Home:</b> This page shows all the projects created and Add project button to create Projects.</li>
  <li><b>Poject Detail:</b> A page for investing/backing a Project. Also the owner can Edit or Delete the Project.</li>
  <li><b>Peer Review:</b> This page showcase projects with verify button to add the credentials and can access the locked documets</li>
  <li><b>Peer-review detail:</b> This page show case project with additional locked content to verify the project. if satisfied peers can approve a project.</li>
  <li><b>Investor:</b> This page only showcase project which are already crowdfunded and needed additional funding based on the matching quadratic Funding Ration</li>
  <li><b>Investor-proj-detail:</b> This page show case all the project details including the person who has approved it and Quadratic funding ratio. A button to invest and earn the rights to produce and manufacture the vaccine is also shown on the page</li>
</ul>

### User interface

* The home page is the landing page of the app, where a add project button and all the projects are shown
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/Createproject.jpg)
  
* When clicked on the project cards it moves to Project description page which show creator, backers, status as well as Edit and Delete button.
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/projectDetail.jpg)
  
* The third page is Peer-Review Page where Cards are shown with Verify Button. The Researcher put their credentials and access to locked content which are not visible to general public.
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/Peer%20Review.jpg)  


## Running the demo

To run the demo follow these steps:

1. Clone the project with the code below.
    ```sh

    # Make sure you have the above prerequisites installed already!
    git clone https://github.com/adi99/MediInvest PROJECT_NAME
    cd PROJECT_NAME # Navigate to the new folder.
    yarn install # Installs all the dependencies.
    ```
2. Create an Infuria project, copy and paste your key in the spaces below.
3. Update the `.env` file with the following details.
    ```sh
    ENDPOINT_URL=<RPC_URL>
    SECRET_KEY=<SECRET_PHRASE>
    DEPLOYER_KEY=<YOUR_PRIVATE_KEY>
    ```
2. Create a CometChat project, copy and paste your key in the spaces below.
3. Run the app using `yarn start`
<br/>


