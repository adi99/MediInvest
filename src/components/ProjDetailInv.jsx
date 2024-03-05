import Identicons from 'react-identicons';
import React, { useState, useEffect } from 'react';
import { FaEthereum } from 'react-icons/fa';
import {
  daysRemaining,
  setGlobalState,
  truncate,
  useGlobalState,
} from '../store';
import { payoutProject,  getApprovedAddresses, investProject} from '../services/blockchain';

const ProjectDetails = ({ project }) => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [approvedAddresses, setApprovedAddresses] = useState([]);
  const [invested, setInvested] = useState(false);
  const expired = new Date().getTime() > Number(project?.expiresAt + '000');

  useEffect(() => {
    const fetchApprovedAddresses = async () => {
      try {
        const addresses = await getApprovedAddresses(project.id);
        setApprovedAddresses(addresses);
      } catch (error) {
        console.error('Error while fetching approved addresses:', error);
      }
    };

    fetchApprovedAddresses();
  }, [project.id]);

  const handleInvestClick = async () => {
    try {
      const amount = (project.cost * project.QuadraticFundingRatio).toString();
      await investProject(project?.id, amount);
      console.log('Investment successful!'); 
      setInvested(true); 
    } catch (error) {
      console.error('Error investing in the project:', error);
    }
  };

  return (
    <div className="pt-24 mb-5 px-6 flex justify-center">
      <div className="flex justify-center flex-col md:w-2/3">
        <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
          <img
            src={project?.imageURL}
            alt={project?.title}
            className="rounded-xl h-64 object-cover sm:w-1/3 w-full"
          />

          <div className="flex-1 sm:py-0 py-4">
            <div className="flex flex-col justify-start flex-wrap">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {project?.title}
              </h5>
              <small className="text-gray-500">
                {expired
                  ? 'Expired'
                  : daysRemaining(project.expiresAt) + ' left'}
              </small>
            </div>

            <div className="flex justify-between items-center w-full pt-1">
              <div className="flex justify-start space-x-2">
                <Identicons
                  className="rounded-full shadow-md"
                  string={project?.owner}
                  size={15}
                />
                {project?.owner ? (
                  <small className="text-gray-700">
                    {truncate(project?.owner, 4, 4, 11)}
                  </small>
                ) : null}
                <small className="text-gray-500 font-bold">
                  {project?.backers} Backer{project?.backers == 1 ? '' : 's'}
                </small>
              </div>

              <div className="font-bold">
                {expired ? (
                  <small className="text-red-500">Expired</small>
                ) : project?.status == 0 ? (
                  <small className="text-gray-500">Open</small>
                ) : project?.status == 1 ? (
                  <small className="text-green-500">Accepted</small>
                ) : project?.status == 2 ? (
                  <small className="text-gray-500">Reverted</small>
                ) : project?.status == 3 ? (
                  <small className="text-red-500">Deleted</small>
                ) : (
                  <small className="text-orange-500">Paid</small>
                )}
              </div>
            </div>
          <div className="mt-2">
             {approvedAddresses.length > 0 && (
            <div className="text-gray-600">
             {approvedAddresses.map((address, index) => (
            <div key={index} className="flex items-center">
            <Identicons className="rounded-full shadow-md" string={address} size={20} />
               <small className="ml-1">{address} has approved this project</small>
              </div>
              ))}
            </div>
            )}
           </div>

            <div>
              <p className="text-sm font-light mt-2">{project?.description}</p>
              <div className="mt-4">
              {project?.pdfURL ? (
              <small href={project?.pdfURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
               View Project PDF
              </small>
               ) : (
              <p className="text-gray-600 mt-2">PDF not available</p>
              )}

                {project?.QuadraticFundingRatio && (
                  <small className="text-gray-600 mt-2">
                    Quadratic Funding Ratio: 1:{project?.QuadraticFundingRatio}
                  </small>
                )}
              </div>
              <div className="w-full overflow-hidden bg-gray-300 mt-4">
                <div
                  className="bg-green-600 text-xs font-medium
              text-green-100 text-center p-0.5 leading-none
              rounded-l-full h-1 overflow-hidden max-w-full"
                  style={{
                    width: `${(project?.raised / project?.cost) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="flex justify-between items-center font-bold mt-2">
                <small>{project?.raised} BNB Raised</small>
                <small className="flex justify-start items-center">
                  <FaEthereum />
                  <span>{project?.cost} BNB</span>
                </small>
              </div>

              <div className="flex justify-start items-center space-x-2 mt-4">
              {/* Conditional rendering of the invest button */}
          {!invested && (
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700"
              onClick={handleInvestClick}
            >
              Invest {(project.cost * project.QuadraticFundingRatio).toFixed(2)} BNB
            </button>
          )}
          {invested && (
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md"
              disabled
            >
              Invested
            </button>
          )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails;
