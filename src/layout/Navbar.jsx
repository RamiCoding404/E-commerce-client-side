/* eslint-disable react/prop-types */
"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  Link,
  HStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import CookieService from "../services/CookieService";
import { selectCart } from "../app/features/CartSlice";
import { useDispatch } from "react-redux";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";

const Links = ["Products", "Dashboard"];

const NavLink = ({ children }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      color: "#7d3ff7",
    }}
    fontWeight={"500"}
    fontSize={"md"}
    to={children.toLowerCase()}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const cartProducts = useSelector(selectCart);
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const token = CookieService.get("jwt");
  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };

  const onOpen = () => {
    dispatch(onOpenCartDrawerAction());
  };

  return (
    <>
      <Box
        borderBottom={
          colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"
        }
        px={4}
        mb={16}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <RouterLink to="/">ECO</RouterLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoon /> : <BsSun />}
              </Button>
              <Button onClick={onOpen}>Cart({cartProducts.length})</Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  <NavLink as={RouterLink} to="/login">
                    Login
                  </NavLink>
                </HStack>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
