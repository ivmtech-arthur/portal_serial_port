import { CircularProgress } from "@mui/material";
import Block from "components/Common/Element/Block";

const Loading = (props) => {
    const { showMenu } = props;
    return (
        <Block
            width={{ _: "100%", md: showMenu ? "calc(100vw - 280px)" : "100vw" }}
            m="0"
            position="fixed"
            top="0"
            height="100vh"
            bg="white"
            zIndex="99999"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
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
