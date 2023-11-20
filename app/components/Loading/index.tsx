import { CircularProgress } from "@mui/material";
import Block from "components/Common/Element/Block";

const Loading = (props) => {
    const { showMenu, loadingTheme } = props;
    return (
        <Block
            width={{ _: "100%", md: showMenu ? "calc(100vw - 280px)" : "100vw" }}
            // m="0"
            // position="fixed"
            // top="0"
            // height="100vh"
            // bg="white"
            zIndex="99999"
            // display="flex"
            // justifyContent="center"
            // alignItems="center"
            className={`m-0 fixed top-0 h-screen flex justify-center items-center ${loadingTheme == "shadow" ? "bg-black bg-opacity-50": "bg-white"}`}        >
            <CircularProgress />
            {/* <div class="dot-flashing" />
            <div class="dot-flashing" />
            <div class="dot-flashing" />
            <div class="dot-flashing" />
            <div class="dot-flashing" /> */}
        </Block>
    );
};

export default Loading;
