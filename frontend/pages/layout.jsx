import { HStack, Box } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box p="2">
      <HStack
        justify="end"
        borderBottom="thick"
        borderBottomColor="lightgray"
        width="100%"
      >
        <NavLink to="/">Pets Home</NavLink>
      </HStack>
      <HStack justify="center">
        <NavLink to="/pets">
          {({ isActive }) => (
            <Box
              p="2"
              borderBottomWidth="thick"
              borderBottomColor={isActive ? "blue.700" : "blue.500"}
            >
              Pet Name List
            </Box>
          )}
        </NavLink>
        </HStack>
        <HStack justify="align-right">
        <NavLink to="/pets/user">
          {({ isActive }) => (
            <Box
              p="2"
              borderBottomWidth="thick"
              borderBottomColor={isActive ? "blue.700" : "blue.500"}
            >
              Pet Owner
            </Box>
          )}
        </NavLink>
        
        
      </HStack>
      <Outlet />
    </Box>
  );
}