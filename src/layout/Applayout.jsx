/* eslint-disable react/prop-types */
import Navbar from "./Navbar";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <>
      <Navbar />
      <Container maxW="7xl" mb={16}>
        <Outlet />
      </Container>
    </>
  );
};

export default Applayout;
