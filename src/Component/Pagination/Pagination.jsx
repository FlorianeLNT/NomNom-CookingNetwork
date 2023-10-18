import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import "./Pagination.css";

function BasicPagination(props) {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const handlePageChange = (e, value) => {
    props.setPage(value);
    navigateToHome();
    window.scrollTo(0, 0);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        onChange={handlePageChange}
        count={props.maxPage}
        color="secondary"
      />
    </Stack>
  );
}

export default BasicPagination;
