import React, { useEffect } from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  useEffect(() => {
    console.log(page, totalPages);
  }, [page, totalPages]);
  return (
    <div className="flex gap-2 justify-center my-4">
      <button
        className="btn-secondary"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        className="btn-secondary"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
