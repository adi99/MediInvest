# MediInvest
Medical Vaccines and Equipment are very expensive Research Projects. This project is based on a quadratic Funding mechanism. The medical vaccines and Equipment researcher can create a CrowdFunding project with all the details and quadratic function for Matching Funding from Investors. This project lets researcher invite other veterans and researcher to verify and approve project from documents which are not available to the general public. Investor can fund and earn the rights to manufacture and distribution of Medicine and Equipments.
 <p align="center">
  <img alt="Dark" src="https://github.com/adi99/MediInvest/blob/main/ProjectView.jpg" width="100%">
</p>

<h1>Core functions:</h1>
## Home
- Display all the ongoing projects in a grid or list format.
- Each project card includes essential details such as project title, brief description, funding progress, and status.
- Provide an "Add Project" button for researchers to create new crowdfunding projects.

## Project Detail
- Show detailed information about a specific project.
- Display funding progress, target amount, and current backers.
- Allow the project owner to edit or delete the project if necessary.
- Provide options for backers to invest in the project.

## Peer Review
- Showcase projects that are in need of peer review.
- Include a "Verify" button for peers to verify the credentials and access locked documents.
- Allow peers to submit their reviews and ratings for each project.

## Peer Review Detail
- Display a specific project requiring peer review.
- Present additional locked content related to the project for verification.
- Peers can submit their approval if satisfied with the project after reviewing the documents.

## Investor
- Show projects that are already crowdfunded and require additional funding based on the quadratic funding ratio.
- Display funding progress, remaining funding needed, and quadratic funding ratio for each project.

## Investor Project Detail
- Showcase detailed information about a particular project, including the person who has approved it and the quadratic funding ratio.
- Provide a button for investors to invest and earn rights to produce and distribute the vaccine or equipment.
- Display information on potential returns or benefits for investors.


### User interface

* The home page is the landing page of the app, where a add project button and all the projects are shown
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/Createproject.jpg)
  
* When clicked on the project cards it moves to Project description page which show creator, backers, status as well as Edit and Delete button.
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/projectDetail.jpg)
  
* The third page is Peer-Review Page where Cards are shown with Verify Button. The Researcher put their credentials and access to locked content which are not visible to general public.
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/Peer%20Review.jpg)

* After putting their Credentials to the Peer-Review page, they will move to Project page again but with additonal content like pdf and other data. They can review the locked content and Approve the Project. 
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/PeerRevDetail.jpg)

* After reaching their Goal, Projects are shown into Investor page. This page only shows the projects who has reached their targets. Investor can invest and Earn the rights to produce the vaccine.
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/Investor.jpg)

* after Clicking the project card it moves to project page where the locked documents, Peer Review and quadratic function ratios are shown. There is also a button which show how much Investment can earn them rights to produce the medicine. If anybody Invested in project, It will be closed for Investment.
  ![Capture d’écran 2022-05-12 à 23 16 45](https://github.com/adi99/MediInvest/blob/main/InvestorDetail.jpg)     


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


