"use client";

import { usePaginationContext } from "@/contexts/paginateContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TablePagination({ noText }: { noText?: boolean }) {
  const {
    currentPage,
    totalPages,
    handlePrev,
    handleNext,
    goToPageNumber,
    previousBtnState,
    nextBtnState,
    totalCount,
    data,
  } = usePaginationContext();

  if (totalPages <= 0) {
    return null; // Don't render pagination if there are no pages
  }

  if (currentPage < 1 || currentPage > totalPages) {
    console.error("Invalid currentPage value");
    return null;
  }

  return (
    <section className="flex w-full flex-wrap items-center justify-between gap-3 py-6 text-sm">
      {!noText && (
        <p className="text-Gray-200 text-sm font-medium">
          Showing {data?.assets?.length} of {totalCount} result{" "}
        </p>
      )}
      <nav aria-label="Pagination" className="w-full max-w-md">
        <article className="text-Gray1 flex items-center justify-between gap-2">
          {/* Previous Button */}
          <button
            disabled={previousBtnState}
            onClick={handlePrev}
            aria-label="Previous Page"
            className="hover:text-Gray-800 card flex items-center gap-2 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={10} /> Prev
          </button>

          {/* Page Numbers */}
          {renderPageNumbers(currentPage, totalPages, goToPageNumber)}

          {/* Next Button */}
          <button
            disabled={nextBtnState}
            onClick={handleNext}
            aria-label="Next Page"
            className="hover:text-Gray-800 card flex items-center gap-2 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight size={10} />
          </button>
        </article>
      </nav>
    </section>
  );
}

export function PageNumber({
  currentPage,
  index,
  goToPageNumber,
}: {
  currentPage: number;
  index: number;
  goToPageNumber: (pageNumber: number) => void;
}) {
  return (
    <button
      onClick={() => goToPageNumber(index)}
      className={`text-Gray-800 hover:bg-Gray-100 flex size-6 items-center justify-center rounded-md transition-colors ${
        currentPage === index ? "bg-Purple-500 font-semibold text-white" : ""
      }`}
    >
      {index}
    </button>
  );
}

export const renderPageNumbers = (
  currentPage: number,
  totalPages: number,
  goToPageNumber: (pageNumber: number) => void,
  maxVisiblePages: number = 5, // Configurable number of visible pages
) => {
  const pageNumbers = [];

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total pages are less than or equal to maxVisiblePages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          currentPage={currentPage}
          index={i}
          goToPageNumber={goToPageNumber}
        />,
      );
    }
  } else {
    // Always show the first page
    pageNumbers.push(
      <PageNumber
        key={1}
        currentPage={currentPage}
        index={1}
        goToPageNumber={goToPageNumber}
      />,
    );

    // Calculate the range of pages to show around the current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis if the current page is not near the start
    if (currentPage > 3) {
      pageNumbers.push(
        <span
          key="ellipsis-start"
          className="flex size-6 items-center justify-center"
        >
          ...
        </span>,
      );
    }

    // Add the range of pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          currentPage={currentPage}
          index={i}
          goToPageNumber={goToPageNumber}
        />,
      );
    }

    // Add ellipsis if the current page is not near the end
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span
          key="ellipsis-end"
          className="flex size-6 items-center justify-center"
        >
          ...
        </span>,
      );
    }

    // Always show the last page
    pageNumbers.push(
      <PageNumber
        key={totalPages}
        currentPage={currentPage}
        index={totalPages}
        goToPageNumber={goToPageNumber}
      />,
    );
  }

  return pageNumbers;
};
