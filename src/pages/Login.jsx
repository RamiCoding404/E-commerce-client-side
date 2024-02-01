/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/LoginSlice";
import { Navigate } from "react-router-dom";
export default function Login({ isAuth }) {
  if (isAuth) return <Navigate to={"/"} replace />;

  const dispatch = useDispatch();
  const { loading } = useSelector(selectLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassowrd, setIsPassword] = useState(false);

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user.identifier && !user.password) {
      setIsEmail(true), setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsEmail(false);
    setIsPassword(false);
    dispatch(userLogin(user));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"lg"}
          p={8}
          as={"form"}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isEmail}
                errorBorderColor="crimson"
                value={user.identifier}
                onChange={onChangeHandler}
                name={"identifier"}
              />
              {isEmail ? (
                <FormHelperText color="red.500">
                  Email is required
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPassowrd}
                  errorBorderColor="crimson"
                  value={user.password}
                  name={"password"}
                  onChange={onChangeHandler}
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    p={0}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>

              {isPassowrd ? (
                <FormHelperText color="red.500">
                  Password is required
                </FormHelperText>
              ) : null}
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={isEmail || isPassowrd ? "red.500" : "blue.400"}
                color={"white"}
                _hover={{
                  bg: isEmail || isPassowrd ? "red.300" : "blue.300",
                }}
                type="submit"
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
