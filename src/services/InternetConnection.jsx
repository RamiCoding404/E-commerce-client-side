/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const InternetConnection = ({ children }) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const toastIdRef = useRef();
  //de hatsht8al fe 7ala online 3ashan ta2fl toast
  function close() {
    toast.closeAll(toastIdRef.current);
  }

  function addToast() {
    toastIdRef.current = toast({
      title: "You'are offline",
      description: "Please make sure you have internet connection",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  }

  const setOnline = () => {
    dispatch(networkMode(true));
    close();
  };
  const setOffline = () => {
    dispatch(networkMode(false));
    addToast();
  };

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      //cleanup
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, [setOffline, setOnline]);

  return children;
};

export default InternetConnection;
