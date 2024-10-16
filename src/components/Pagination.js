import React from 'react';
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";

const Pagination = ({ currentPage, totalRecords, pageSize, onPageChange }) => {
    const validPageSize = pageSize > 0 ? pageSize : 10;

    const totalPages = Math.max(1, Math.ceil(totalRecords / validPageSize));
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const handlePageChange = (event) => {
        const selectedPage = Number(event.target.value);
        if (selectedPage >= 1 && selectedPage <= totalPages) {
            onPageChange(selectedPage);
        }
    };
    // Handle clicking of the Previous button
    const handlePrevious = () => {
            if (currentPage > 1) {
                onPageChange(currentPage - 1);
            }
        };

        // Handle clicking of the Next button
        const handleNext = () => {
            if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
            }
        };

    return (
        <div className="flex items-center justify-end mt-4 bg-secondary-50 py-2">
            <select
                value={currentPage}
                onChange={handlePageChange}
                className="py-1 border rounded-md bg-white text-gray-800 mr-4"
            >
                {pages.map((page) => (
                    <option key={page} value={page}>
                        {page}
                    </option>
                ))}
            </select>
            <div className="flex items-center mr-4">
                <span className="text-gray-600">1</span>
                <span className="text-gray-600">-</span>
                <span className="text-gray-600">{totalPages > 0 ? totalPages: 1 }</span>
            </div>
            <div className="flex items-center mr-4">
                <span className="text-gray-600">{`Page ${currentPage} of ${totalPages > 0 ? totalPages: 1}`}</span>
            </div>
            {/* <div className="flex items-center mr-4">
                <span className="text-gray-600">of {currentPage}</span>
            </div> */}
            {/* Previous button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`pagination-link ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} mr-2 rounded-md`}
            >
                <IoIosArrowBack className="text-2xl text-gray-600" />
            </button>

            {/* Next button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`pagination-link ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-md`}
            >
                <IoIosArrowForward className="text-2xl text-gray-600" />
            </button>
        </div>
    );
};

export default Pagination;
