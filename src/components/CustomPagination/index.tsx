import React, { useState, useEffect, ChangeEvent } from "react";
import { recipeItem } from "../../pages/FindRecipe/recipeList";
import { service } from "../../services/hooks";
import { Container, Pagination, Row } from "react-bootstrap";

interface CustomPaginationProps {
  pageSize: number;
  items: recipeItem[];
  setPageItems(p: recipeItem[]): void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  pageSize,
  items,
  setPageItems,
}) => {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    page: 1,
    to: pageSize,
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(items.length / pageSize);

  useEffect(() => {
    service
      .getData({
        from: pagination.from,
        to: pagination.to,
        items: items,
      })
      .then((response: any) => {
        setPagination({ ...pagination, count: response.count });
        setPageItems(response.data);
      });
  }, [pagination.from, pagination.to, items]);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    const from = (value - 1) * pageSize;
    const to = (value - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to, page: value });
    setCurrentPage(value);
  };

  const handlePrevNext = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? currentPage - 1 : currentPage + 1;

    // Ensure the new page is within valid bounds
    if (newPage < 1 || newPage > totalPages) return;

    const from = (newPage - 1) * pageSize;
    const to = from + pageSize;

    setPagination({ ...pagination, from: from, to: to, page: newPage });
    setCurrentPage(newPage);
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Row>
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePrevNext("prev")}
            disabled={currentPage === 1}
          >
            &laquo; Back
          </Pagination.Prev>
          {Array.from(
            { length: Math.ceil(pagination.count / pageSize) }, // Total pages
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === pagination.page} // Highlight the active page
                onClick={() => handlePageChange(null as any, index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => handlePrevNext("next")}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </Pagination.Next>
        </Pagination>
      </Row>
    </Container>
  );
};

export default CustomPagination;
